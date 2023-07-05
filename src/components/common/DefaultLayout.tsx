import React from "react";
import Navbar from "./Navbar";

type Props = {
  children: React.ReactNode;
};

export default function DefaultLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
