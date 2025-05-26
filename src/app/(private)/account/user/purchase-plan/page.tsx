"use client";

import { getAllPlans } from "@/actions/plans";
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/ui/page-title";
import Spinner from "@/components/ui/spinner";
import { plansStore, IPlansStore } from "@/store/plans-store";
import { IPlan } from "@/types/plan";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const { selectedPlan, setSelectedPlan } = plansStore() as IPlansStore;

  const fetchData = async () => {
    try {
      setLoading(true);
      const response: any = await getAllPlans();
      if (!response.success) {
        throw new Error(response.message);
      }
      setPlans(response.data);
    } catch (error) {
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getPaymentPlans = (plan: IPlan) => {
    return [
      {
        planName: "Monthly",
        price: plan.monthly_price,
        key: "monthly_price",
        duration: 30,
      },
      {
        planName: "Quarterly",
        price: plan.quarterly_price,
        key: "quarterly_price",
        duration: 90,
      },
      {
        planName: "Half Yearly",
        price: plan.half_yearly_price,
        key: "half_yearly_price",
        duration: 180,
      },
      {
        planName: "Yearly",
        price: plan.yearly_price,
        key: "yearly_price",
        duration: 365,
      },
    ];
  };
  return (
    <>
      <PageTitle title="Purchase Plan" />
      {loading && <Spinner height={120} />}

      <div className="grid grid-cols-4 gap-7 mt-7">
        {plans.map((plan: any) => {
          const paymentPlans = getPaymentPlans(plan);

          return (
            <div
              className="flex flex-col justify-between p-5 border border-gray-300 rounded-lg"
              key={plan.id}
              style={{
                border:
                  selectedPlan?.mainPlan?.id === plan.id
                    ? "2px solid #000"
                    : "",
              }}
            >
              <div className="flex flex-col gap-2 mt-5">
                <h1 className="text-lg font-bold">{plan.name}</h1>
                <p className="text-xs text-gray-700 line-clamp-3">
                  {plan.description}
                </p>

                <hr />
                <h1 className="text-sm font-bold">Features</h1>

                <ul className="flex flex-col gap-1">
                  {plan.features.map((feature: any, index: number) => (
                    <li
                      key={index}
                      className="text-xs text-gray-700 line-clamp-1"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-5 mt-5">
                <h1 className="text-sm font-bold">Pricing</h1>
                <select
                  className="border border-gray-500 rounded-md p-2 text-sm"
                  onChange={(e) => {
                    setSelectedPlan({
                      mainPlan: plan,
                      paymentPlan: paymentPlans.find(
                        (paymentPlan) =>
                          paymentPlan.price === Number(e.target.value)
                      ),
                    });
                  }}
                  value={
                    selectedPlan?.mainPlan?.id === plan.id
                      ? selectedPlan?.paymentPlan?.price
                      : ""
                  }
                >
                  <option value="" className="text-sm">
                    Select Payment Plan
                  </option>
                  {paymentPlans.map((paymentPlan) => (
                    <option
                      key={paymentPlan.key}
                      value={paymentPlan.price}
                      className="text-sm"
                    >
                      {paymentPlan.planName} - {paymentPlan.price}
                    </option>
                  ))}
                </select>

                <Button
                  disabled={
                    !selectedPlan?.paymentPlan ||
                    selectedPlan?.mainPlan?.id !== plan.id
                  }
                >
                  <Link href={"/account/user/purchase-plan/checkout"}>
                    Checkout
                  </Link>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Page;
