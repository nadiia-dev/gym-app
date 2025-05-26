import { getCurrentUser } from "@/app/actions/users";
import { IUser } from "@/types/user";
import { ReactNode, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Header from "./header";

const PrivateLayout = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const fetchUser = async () => {
    try {
      const res: any = await getCurrentUser();
      if (!res.success) {
        throw new Error(res.error);
      } else {
        setUser(res.data);
      }
    } catch (e) {
      if (e instanceof Error) {
        toast.error("An error");
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Header user={user} />
      {children}
    </div>
  );
};

export default PrivateLayout;
