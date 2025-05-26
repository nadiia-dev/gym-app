import { IUser } from "@/types/user";
import { Menu } from "lucide-react";
import { useState } from "react";
import HeaderMenu from "./header-menu";

const Header = ({ user }: { user: IUser | null }) => {
  const [isOpenMenu, setOpenMenu] = useState(false);
  return (
    <div className="flex items-center justify-between bg-primary px-5 py-5">
      <h1 className="text-2xl font-bold text-white">
        <b className="text-white">Gym.</b>
        <b className="text-green-600">App</b>
      </h1>

      <div className="flex gap-5 items-center">
        <h1 className="text-sm text-white">{user?.name}</h1>

        <Menu
          className="text-white cursor-pointer"
          size={15}
          onClick={() => setOpenMenu(true)}
        />
        {isOpenMenu && user && (
          <HeaderMenu
            user={user}
            isOpenMenu={isOpenMenu}
            setOpenMenu={setOpenMenu}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
