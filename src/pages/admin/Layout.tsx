import React from "react";
// import Sidebar from "./Sidebar";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="">
      {children}
      <div className="">
        {/* <Sidebar /> */}
      </div>
    </div>
  );
}
