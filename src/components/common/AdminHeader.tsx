import React from "react";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownUser from "./DropdownUser";
import Link from "next/link";
// import

export default function AdminHeader() {
  return (
    <nav className="absolute left-0 top-0 z-10 flex w-full items-center p-4 shadow-none sm:shadow-lg md:flex-row md:flex-nowrap md:justify-start">
      <div className="mx-autp flex w-full flex-wrap items-center justify-between px-4 md:flex-nowrap md:px-10">
        {/* Brand */}
        <Link
          className="hidden text-sm font-semibold uppercase  lg:inline-block"
          href="/admin"
        >
          Dashboard
        </Link>
        {/* Menu */}
        <ul className="hidden list-none flex-col items-center gap-3 md:flex md:flex-row">
          <DarkModeSwitcher />
          <DropdownUser />
        </ul>
      </div>
    </nav>
  );
}
