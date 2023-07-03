import React from "react";
import SideNavbar from "./SideNavbar";
import AdminHeader from "./AdminHeader";
import HeaderStats from "./HeaderStats";
import { Separator } from "../ui/separator";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <SideNavbar />
      <div className="relative md:ml-64">
        <AdminHeader />
        {/* Header */}
        <HeaderStats />
        <div className="-m-24 mx-auto w-full px-4 md:px-10">
          <Separator className="m-2 p-2" />
          {children}
          {/* <FooterAdmin /> */}
        </div>
      </div>
    </>
  );
}
