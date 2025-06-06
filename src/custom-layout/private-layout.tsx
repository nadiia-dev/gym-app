import { getCurrentUser } from "@/actions/users";
import { ReactNode, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Header from "./header";
import Spinner from "@/components/ui/spinner";
import usersStore, { IUsersStore } from "@/store/users-store";
import { getCurSubscription } from "@/actions/subscriptions";

const PrivateLayout = ({ children }: { children: ReactNode }) => {
  const { user, setUser, setCurSubscription } = usersStore() as IUsersStore;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res: any = await getCurrentUser();
      if (!res.success) {
        setError(res.error);
        throw new Error(res.error);
      } else {
        setUser(res.data);

        const subResp: any = await getCurSubscription(res.data.id);
        if (subResp.success) {
          setCurSubscription(subResp.data);
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message || "An error occurred while fetching user data");
        toast.error("An error occurred while fetching user data");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return <Spinner height="100vh" />;

  if (!loading && error) return <div className="p-5">{error}</div>;

  return (
    <div>
      <Header user={user} />
      <div className="p-5">{children}</div>
    </div>
  );
};

export default PrivateLayout;
