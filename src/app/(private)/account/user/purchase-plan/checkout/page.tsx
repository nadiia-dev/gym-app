"use client";
import { getStripePayment } from "@/actions/payments";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PageTitle from "@/components/ui/page-title";
import { IPlansStore, plansStore } from "@/store/plans-store";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { CheckoutProvider, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./_components/checkout-form";
import usersStore, { IUsersStore } from "@/store/users-store";
import { createSubscription } from "@/actions/subscriptions";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

const Page = () => {
  const { selectedPlan, setSelectedPlan } = plansStore() as IPlansStore;
  const [startDate, setStartDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const { user } = usersStore() as IUsersStore;
  const router = useRouter();

  const endDate = useMemo(() => {
    return dayjs(startDate)
      .add(selectedPlan?.paymentPlan?.duration, "day")
      .format("YYYY-MM-DD");
  }, [startDate]);

  const renderProperty = (key: string, value: any) => {
    try {
      return (
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">{key}</span>
          <span className="text-gray-700 font-semibold text-sm">{value}</span>
        </div>
      );
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
    }
  };

  const paymentHandler = async () => {
    try {
      setLoading(true);
      const res = await getStripePayment(selectedPlan?.paymentPlan?.price);
      if (res.success) {
        setClientSecret(res.data);
        setShowCheckoutForm(true);
      } else {
        throw new Error(res.message);
      }
    } catch (e) {
      toast.error("Payment Failed");
    } finally {
      setLoading(false);
    }
  };

  const options = {
    clientSecret: clientSecret!,
  };

  const onPaymentSuccess = async (paymentId: string) => {
    try {
      const payload = {
        user_id: user?.id,
        plan_id: selectedPlan?.mainPlan?.id,
        start_date: startDate,
        end_date: endDate,
        payment_id: paymentId,
        amount: Number(selectedPlan?.paymentPlan?.price),
        total_duration: Number(selectedPlan?.paymentPlan?.duration),
        is_active: true,
      };
      const res = await createSubscription(payload);

      if (res.success) {
        toast.success(
          "Congratulations! Your payment was successful , Your subscription has been activated"
        );
        router.push("/account/user/subscriptions");
      } else {
        throw new Error(res.message);
      }
    } catch (e) {
      toast.error("An error occurred while processing your payment");
    }
  };

  return (
    <div>
      <PageTitle title="Checkout" />
      {selectedPlan && (
        <div className="grid grid-cols-2 mt-7">
          <div className="col-span-1 p-5 border border-gray-500 flex flex-col gap-2 rounded-lg">
            {renderProperty("Plan Name", selectedPlan?.mainPlan?.name)}
            {renderProperty("Amount", "$" + selectedPlan?.paymentPlan?.price)}
            {renderProperty(
              "Duration",
              selectedPlan?.paymentPlan?.duration + " days"
            )}
            {renderProperty(
              "Start Date",
              <Input
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                type="date"
              />
            )}

            {startDate && renderProperty("End Date", endDate)}

            <Button
              className="mt-7"
              disabled={loading}
              onClick={paymentHandler}
            >
              Pay Now
            </Button>
          </div>
        </div>
      )}

      {!selectedPlan && (
        <div className="mt-5 text-sm">
          <p>Please select a payment plan</p>
        </div>
      )}

      {showCheckoutForm && clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm
            showCheckoutForm={showCheckoutForm}
            setShowCheckoutForm={setShowCheckoutForm}
            onPaymentSuccess={onPaymentSuccess}
          />
        </Elements>
      )}
    </div>
  );
};

export default Page;
