import React from "react";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownUser from "./DropdownUser";

export default function Header() {
  return (
    <header className="z-999 drop-shadow-1 dark:bg-boxdark sticky top-0 flex w-full drop-shadow-none">
      <div className="shadow-2 flex flex-grow items-center justify-end px-4 py-4 md:px-6 2xl:px-11">
        <div className="2xsm:gap-7 flex items-center gap-3">
          <ul className="2xsm:gap-4 flex items-center gap-2">
            {/* <!-- Dark Mode Toggler --> */}
            <DarkModeSwitcher />
            {/* <!-- Dark Mode Toggler --> */}
          </ul>

          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
}
