import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { IUser } from "@/types/user";
import { SignOutButton } from "@clerk/nextjs";
import {
  FolderKanban,
  Heart,
  Home,
  List,
  LogOut,
  ShieldCheck,
  User2,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  user: IUser | null;
  isOpenMenu: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderMenu = ({ user, isOpenMenu, setOpenMenu }: Props) => {
  const iconSize = 15;
  const pathname = usePathname();
  const router = useRouter();

  const userMenuItems = [
    {
      name: "Home",
      icon: <Home size={iconSize} />,
      route: "/account",
    },
    {
      name: "Profile",
      icon: <User2 size={iconSize} />,
      route: "/account/user/profile",
    },
    {
      name: "My Subscriptions",
      icon: <ShieldCheck size={iconSize} />,
      route: "/account/user/subscriptions",
    },
    {
      name: "Referrals",
      icon: <Heart size={iconSize} />,
      route: "/account/user/referrals",
    },
  ];
  const adminMenuItems = [
    {
      name: "Home",
      icon: <Home size={iconSize} />,
      route: "/account",
    },
    {
      name: "Plans",
      icon: <FolderKanban size={iconSize} />,
      route: "/account/admin/plans",
    },
    {
      name: "Users",
      icon: <User2 size={iconSize} />,
      route: "/account/admin/users",
    },
    {
      name: "Subscriptions",
      icon: <ShieldCheck size={iconSize} />,
      route: "/account/admin/subscriptions",
    },
    {
      name: "Customers",
      icon: <List size={iconSize} />,
      route: "/account/admin/customers",
    },
    {
      name: "Referrals",
      icon: <Heart size={iconSize} />,
      route: "/account/user/referrals",
    },
  ];

  let itemsToRender = user?.is_admin ? adminMenuItems : userMenuItems;
  return (
    <Sheet open={isOpenMenu} onOpenChange={setOpenMenu}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle></SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-10 mt-20">
          {itemsToRender.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 p-3 cursor-pointer rounded ${
                pathname === item.route
                  ? "bg-gray-100 border border-gray-500"
                  : ""
              }`}
              onClick={() => {
                router.push(item.route);
                setOpenMenu(false);
              }}
            >
              {item.icon}
              <span className="text-sm">{item.name}</span>
            </div>
          ))}

          <SignOutButton>
            <Button>
              <LogOut size={iconSize} />
              Sign Out
            </Button>
          </SignOutButton>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HeaderMenu;
