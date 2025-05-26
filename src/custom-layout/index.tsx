"use client";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import PrivateLayout from "./private-layout";
import PublicLayout from "./public-layout";

const CustomLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  if (pathname.includes("/account"))
    return <PrivateLayout>{children}</PrivateLayout>;
  else {
    return <PublicLayout>{children}</PublicLayout>;
  }
};

export default CustomLayout;
