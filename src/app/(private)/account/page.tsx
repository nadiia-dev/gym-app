import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

const Page = async () => {
  const curUser = await currentUser();
  const name = curUser?.firstName + " " + curUser?.lastName;
  const clerkUserId = curUser?.id;
  const email = curUser?.emailAddresses[0].emailAddress;

  return (
    <div className="p-5">
      <p>Account Page</p>
      <UserButton fallback="/" afterSignOutUrl="/" />
      <div>
        <p>Username: {name}</p>
        <p>id: {clerkUserId}</p>
        <p>Email: {email}</p>
      </div>
    </div>
  );
};

export default Page;
