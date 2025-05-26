"use client";
import usersStore, { IUsersStore } from "@/store/users-store";

const Page = () => {
  const { user } = usersStore() as IUsersStore;

  return <div>{user?.name} welcome to your profile page!</div>;
};

export default Page;
