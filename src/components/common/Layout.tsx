import React from "react";
import { Separator } from "../ui/separator";
import dynamic from "next/dynamic";

type Props = {
  children: React.ReactNode;
};

const Loading = dynamic(() => import("@/components/common/Loading"));
const SideNavbar = dynamic(() => import("@/components/common/SideNavbar"), {
  loading: () => <Loading />,
});
const AdminHeader = dynamic(() => import("@/components/common/AdminHeader"), {
  loading: () => <Loading />,
});
const HeaderStats = dynamic(() => import("@/components/common/HeaderStats"), {
  loading: () => <Loading />,
});

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
        </div>
      </div>
    </>
  );
}
