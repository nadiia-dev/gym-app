"use client";
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/ui/page-title";
import usersStore, { IUsersStore } from "@/store/users-store";
import Link from "next/link";

const Page = () => {
  const { user } = usersStore() as IUsersStore;
  return (
    <div>
      <PageTitle title="Account page" />
      <p>Welcome {user?.name}</p>
      <Button className="w-max">
        <Link href="/account/user/purchase-plan">View subscription plans</Link>
      </Button>
    </div>
  );
};

export default Page;
