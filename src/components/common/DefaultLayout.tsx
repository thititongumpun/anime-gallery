import React from "react";
import dynamic from "next/dynamic";

type Props = {
  children: React.ReactNode;
};

const Loading = dynamic(() => import("@/components/common/Loading"));
const DynamicNavbar = dynamic(() => import("@/components/common/Navbar"), {
  loading: () => <Loading />,
});

export default function DefaultLayout({ children }: Props) {
  return (
    <div className="flex flex-col justify-between md:min-h-screen">
      <DynamicNavbar />
      <main>{children}</main>
    </div>
  );
}
