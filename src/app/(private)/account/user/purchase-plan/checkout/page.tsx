"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PageTitle from "@/components/ui/page-title";
import { IPlansStore, plansStore } from "@/store/plans-store";
import dayjs from "dayjs";
import { useMemo, useState } from "react";

const Page = () => {
  const { selectedPlan, setSelectedPlan } = plansStore() as IPlansStore;
  const [startDate, setStartDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [loading, setLoading] = useState(false);

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
      return <></>;
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

            <Button className="mt-7" disabled={loading}>
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
    </div>
  );
};

export default Page;
