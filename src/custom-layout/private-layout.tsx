import { getCurrentUser } from "@/app/actions/users";
import { IUser } from "@/types/user";
import { ReactNode, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Header from "./header";
import Spinner from "@/components/ui/spinner";
import usersStore, { IUsersStore } from "@/store/users-store";

const PrivateLayout = ({ children }: { children: ReactNode }) => {
  const { user, setUser } = usersStore() as IUsersStore;
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
      {children}
    </div>
  );
};

export default PrivateLayout;
