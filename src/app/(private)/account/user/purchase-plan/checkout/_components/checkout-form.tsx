import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  showCheckoutForm: boolean;
  setShowCheckoutForm: (showCheckoutForm: boolean) => void;
  onPaymentSuccess: (paymentId: string) => void;
}

const CheckoutForm = ({
  showCheckoutForm,
  setShowCheckoutForm,
  onPaymentSuccess,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (e: any) => {
    try {
      setLoading(true);
      e.preventDefault();

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "",
        },
        redirect: "if_required",
      });

      if (result.error) {
        toast.error(
          result.error.message ||
            "An error occurred while processing your payment"
        );
      } else {
        toast.success("Payment successful");
        onPaymentSuccess(result.paymentIntent.id);
        setShowCheckoutForm(false);
      }
    } catch (error) {
      toast.error("An error occurred while processing your payment");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={showCheckoutForm} onOpenChange={setShowCheckoutForm}>
      <DialogContent className="sm:max-w-[525px] max-h-[500px] overflow-y-scroll overflow-x-hidden">
        <DialogHeader>
          <DialogTitle>Complete payment</DialogTitle>
          <DialogDescription>
            Complete your payment to start your plan
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <PaymentElement />
          <AddressElement
            options={{
              allowedCountries: ["US"],
              mode: "billing",
            }}
          />

          <div className="flex justify-end gap-5 mt-7">
            <Button variant={"outline"} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              Pay Now
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutForm;
