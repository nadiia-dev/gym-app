import { useEffect, useState } from "react";
import DashboardCard from "./dashboard-card";
import toast from "react-hot-toast";
import { getReport, getSubscriptionsReport } from "@/actions/dashboard";

const AdminDashboard = () => {
  const [userData, setUserData] = useState<any>({
    users_count: 0,
    customers_count: 0,
    admins_count: 0,
  });

  const [subscriptionData, setSubscriptionData] = useState<any>({
    subscriptions_count: 0,
    revenue: 0,
  });

  const fetchUsersData = async () => {
    try {
      const res: any = await getReport();
      if (!res.success) {
        toast.error(res.message);
      } else {
        setUserData(res.data);
      }
    } catch (error) {
      toast.error("An error occured while fetching data");
    }
  };

  const fetchSubscriptionsData = async () => {
    try {
      const res = await getSubscriptionsReport();
      if (!res.success) {
        toast.error(res.message);
      } else {
        setSubscriptionData(res.data);
      }
    } catch (error) {
      toast.error("An error occured while fetching data");
    }
  };

  useEffect(() => {
    fetchUsersData();
    fetchSubscriptionsData();
  }, []);

  return (
    <div>
      <div>
        <h1 className="text-sm font-bold">Users / Customers</h1>
        <div className="grid grid-cols-4 mt-2 gap-5">
          <DashboardCard
            value={userData.users_count || 0}
            name="Total Users"
            description="Total number of users"
          />
          <DashboardCard
            value={userData.customers_count || 0}
            name="Total Customers"
            description="Total number of customers"
          />
          <DashboardCard
            value={userData.admins_count || 0}
            name="Total Admins"
            description="Total number of admins"
          />
        </div>
        <div className="mt-7">
          <h1 className="text-sm font-bold">Subscriptions</h1>
          <div className="grid grid-cols-4 mt-2 gap-5">
            <DashboardCard
              value={subscriptionData.subscriptions_count || 0}
              name="Total Subscriptions"
              description="Total number of subscriptions"
            />

            <DashboardCard
              value={subscriptionData.revenue || 0}
              name="Revenue"
              description="Total revenue generated"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
