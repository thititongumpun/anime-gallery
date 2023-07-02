/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Link from "next/link";
import React, { useState } from "react";
import { HomeIcon, ArchiveIcon, RowsIcon } from "@radix-ui/react-icons";

export default function Sidebar() {
  const menus = [
    { name: "Overview", link: "/admin", icon: HomeIcon },
    { name: "Category", link: "#", icon: ArchiveIcon },
  ];
  const [open, setOpen] = useState(false);

  return (
    <section className="flex gap-6">
      <div
        className={`min-h-screen bg-gray-500 ${
          open ? "w-72" : "w-16"
        } px-4  duration-500`}
      >
        <div className="mt-4 flex justify-end p-2">
          <RowsIcon className="cursor-pointer" onClick={() => setOpen(!open)} />
        </div>
        <div className="relative mt-4 flex flex-col gap-4">
          {menus?.map((menu, i) => (
            <Link
              href={menu?.link}
              key={i}
              className={` ${"mt-5"} group flex items-center gap-3.5  rounded-md p-2 text-sm font-medium hover:bg-gray-800`}
            >
              <div>{React.createElement(menu?.icon)}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "translate-x-28 overflow-hidden opacity-0"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 w-0 overflow-hidden whitespace-pre rounded-md bg-white px-0 py-0 font-semibold text-gray-900 drop-shadow-lg group-hover:left-14 group-hover:w-fit group-hover:px-2 group-hover:py-1 group-hover:duration-300  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
