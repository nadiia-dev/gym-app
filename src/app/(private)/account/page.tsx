"use client";
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/ui/page-title";
import usersStore, { IUsersStore } from "@/store/users-store";
import dayjs from "dayjs";
import Link from "next/link";

const Page = () => {
  const { user, curSubscription } = usersStore() as IUsersStore;

  const renderProperty = (label: string, value: any) => (
    <div className="flex justify-between">
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );

  return (
    <div>
      <PageTitle title="Account page" />
      <p>Welcome {user?.name}</p>

      {!curSubscription && (
        <div className="flex flex-col gap-5">
          <p className="mt-5 text-sm text-gray-600">
            You do not any active subscription at the moment. Please subscribe
            to enjoy our services.
          </p>

          <Button className="w-max">
            <Link href={"account/user/purchase-plan"}>
              View Subscription Plans
            </Link>
          </Button>
        </div>
      )}

      {curSubscription && (
        <div className="mt-7 grid grid-cols-2">
          <div className="col-span-1 p-5 border rounded border-gray-500 flex flex-col gap-2">
            <h1 className="text-sm font-semibold">Your Current Subscription</h1>
            <hr />
            {renderProperty("Subscription ID", curSubscription?.id)}
            {renderProperty("Plan", curSubscription?.plan?.name)}
            {renderProperty(
              "Purchased On",
              dayjs(curSubscription?.created_at).format("MMM DD, YYYY")
            )}
            {renderProperty(
              "Start Date",
              dayjs(curSubscription?.start_date).format("MMM DD, YYYY")
            )}
            {renderProperty(
              "End Date",
              dayjs(curSubscription?.end_date).format("MMM DD, YYYY")
            )}
            {renderProperty(
              "Total Duration",
              curSubscription?.total_duration + " days"
            )}
            {renderProperty("Amount", curSubscription?.amount)}
            {renderProperty("Payment Id", curSubscription?.payment_id)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
