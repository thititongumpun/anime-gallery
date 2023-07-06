import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import { HomeIcon } from "@heroicons/react/24/outline";
import DropdownUser from "./DropdownUser";
import DarkModeSwitcher from "./DarkModeSwitcher";

export default function SideNavbar() {
  const [collapseShow, setCollapseShow] = useState("hidden");
  const router = useRouter();
  return (
    <nav className="relative z-10 flex flex-wrap items-center justify-between  px-6 py-4 shadow-xl md:fixed md:bottom-0 md:left-0 md:top-0 md:block md:w-64 md:flex-row md:flex-nowrap md:overflow-hidden md:overflow-y-auto">
      <div className="mx-auto flex w-full flex-wrap items-center justify-between px-0 md:min-h-full md:flex-col md:flex-nowrap md:items-stretch">
        {/* Toggler */}
        <button
          className="cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none opacity-50 md:hidden"
          type="button"
          onClick={() =>
            setCollapseShow("bg-white dark:bg-black m-2 py-3 px-6")
          }
        >
          <HamburgerMenuIcon className="h-6 w-6" />
        </button>
        {/* Brand */}
        <Link
          href="/"
          className="hidden items-center justify-center gap-2 md:flex"
        >
          <HomeIcon className="h-6 w-6" />
          Home
        </Link>

        {/* User */}
        <ul className="flex list-none flex-wrap items-center gap-2 md:hidden">
          <li className="relative inline-block">
            <DarkModeSwitcher />
          </li>
          <li className="relative inline-block">
            <DropdownUser />
          </li>
        </ul>
        {/* Collapse */}
        <div
          className={
            "absolute left-0 right-0 top-0 z-40 h-auto flex-1 items-center overflow-y-auto overflow-x-hidden rounded shadow md:relative md:mt-4 md:flex md:flex-col md:items-stretch md:opacity-100 md:shadow-none " +
            collapseShow
          }
        >
          {/* Collapse header */}
          <div className="border-blueGray-200 mb-4 block border-b border-solid pb-4 md:hidden md:min-w-full">
            <div className="flex flex-wrap">
              <div className="w-6/12">
                <Link
                  href="/"
                  className=" inline-flex items-center justify-center gap-2"
                >
                  <HomeIcon className="h-4 w-4" />
                  Home
                </Link>
              </div>
              <div className="flex w-6/12 justify-end">
                <button
                  type="button"
                  className="cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none  opacity-50 md:hidden"
                  onClick={() => setCollapseShow("hidden")}
                >
                  <Cross1Icon />
                </button>
              </div>
            </div>
          </div>
          {/* Heading */}
          <h6 className="block pb-4 pt-1 text-xs font-bold uppercase no-underline md:min-w-full">
            Pages
          </h6>
          {/* Navigation */}

          <ul className="flex list-none flex-col md:min-w-full md:flex-col">
            <li className="items-center">
              <Link
                href="/admin/product"
                className={
                  "block py-3 text-xs font-bold uppercase " +
                  (router.pathname.indexOf("/admin/product") !== -1
                    ? "text-lightBlue-500 hover:text-lightBlue-600"
                    : "hover:text-blueGray-500")
                }
              >
                <i
                  className={
                    "fas fa-tv mr-2 text-sm " +
                    (router.pathname.indexOf("/admin/product") !== -1
                      ? "opacity-75"
                      : "text-blueGray-300")
                  }
                ></i>{" "}
                Product
              </Link>
            </li>

            <li className="items-center">
              <Link
                href="/admin/category"
                className={
                  "block py-3 text-xs font-bold uppercase " +
                  (router.pathname.indexOf("/admin/category") !== -1
                    ? "text-lightBlue-500 hover:text-lightBlue-600"
                    : "hover:text-blueGray-500")
                }
              >
                <i
                  className={
                    "fas fa-tools mr-2 text-sm " +
                    (router.pathname.indexOf("/admin/category") !== -1
                      ? "opacity-75"
                      : "text-blueGray-300")
                  }
                ></i>{" "}
                Category
              </Link>
            </li>

            <li className="items-center">
              <Link
                href="/admin/tables"
                className={
                  "block py-3 text-xs font-bold uppercase " +
                  (router.pathname.indexOf("/admin/tables") !== -1
                    ? "text-lightBlue-500 hover:text-lightBlue-600"
                    : "text-blueGray-700 hover:text-blueGray-500")
                }
              >
                <i
                  className={
                    "fas fa-table mr-2 text-sm " +
                    (router.pathname.indexOf("/admin/tables") !== -1
                      ? "opacity-75"
                      : "text-blueGray-300")
                  }
                ></i>{" "}
                Tables
              </Link>
            </li>

            <li className="items-center">
              <Link
                href="/admin/maps"
                className={
                  "block py-3 text-xs font-bold uppercase " +
                  (router.pathname.indexOf("/admin/maps") !== -1
                    ? "text-lightBlue-500 hover:text-lightBlue-600"
                    : "text-blueGray-700 hover:text-blueGray-500")
                }
              >
                <i
                  className={
                    "fas fa-map-marked mr-2 text-sm " +
                    (router.pathname.indexOf("/admin/maps") !== -1
                      ? "opacity-75"
                      : "text-blueGray-300")
                  }
                ></i>{" "}
                Maps
              </Link>
            </li>
          </ul>

          {/* Divider */}
          <hr className="my-4 md:min-w-full" />
          {/* Heading */}
          <h6 className="text-blueGray-500 block pb-4 pt-1 text-xs font-bold uppercase no-underline md:min-w-full">
            Auth Layout Pages
          </h6>
          {/* Navigation */}

          <ul className="flex list-none flex-col md:mb-4 md:min-w-full md:flex-col">
            <li className="items-center">
              <Link
                href="/auth/login"
                className="text-blueGray-700 hover:text-blueGray-500 block py-3 text-xs font-bold uppercase"
              >
                <i className="fas fa-fingerprint text-blueGray-400 mr-2 text-sm"></i>{" "}
                Login
              </Link>
            </li>

            <li className="items-center">
              <Link
                href="/auth/register"
                className="text-blueGray-700 hover:text-blueGray-500 block py-3 text-xs font-bold uppercase"
              >
                <i className="fas fa-clipboard-list text-blueGray-300 mr-2 text-sm"></i>{" "}
                Register
              </Link>
            </li>
          </ul>

          {/* Divider */}
          <hr className="my-4 md:min-w-full" />
          {/* Heading */}
          <h6 className=" block pb-4 pt-1 text-xs font-bold uppercase no-underline md:min-w-full">
            No Layout Pages
          </h6>
          {/* Navigation */}

          <ul className="flex list-none flex-col md:mb-4 md:min-w-full md:flex-col">
            <li className="items-center">
              <Link
                href="/landing"
                className="text-blueGray-700 hover:text-blueGray-500 block py-3 text-xs font-bold uppercase"
              >
                <i className="fas fa-newspaper text-blueGray-400 mr-2 text-sm"></i>{" "}
                Landing Page
              </Link>
            </li>

            <li className="items-center">
              <Link
                href="/profile"
                className="text-blueGray-700 hover:text-blueGray-500 block py-3 text-xs font-bold uppercase"
              >
                <i className="fas fa-user-circle text-blueGray-400 mr-2 text-sm"></i>{" "}
                Profile Page
              </Link>
            </li>
          </ul>

          {/* Divider */}
          <hr className="my-4 md:min-w-full" />
          {/* Heading */}
          <h6 className="text-blueGray-500 block pb-4 pt-1 text-xs font-bold uppercase no-underline md:min-w-full">
            Documentation
          </h6>
          {/* Navigation */}
          <ul className="flex list-none flex-col md:mb-4 md:min-w-full md:flex-col">
            <li className="inline-flex">
              <i className="fas fa-paint-brush text-blueGray-300 mr-2 text-base"></i>
              Styles
            </li>

            <li className="inline-flex">
              <a
                href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/alerts/notus"
                target="_blank"
                className="text-blueGray-700 hover:text-blueGray-500 mb-4 block text-sm font-semibold no-underline"
              >
                <i className="fab fa-css3-alt text-blueGray-300 mr-2 text-base"></i>
                CSS Components
              </a>
            </li>

            <li className="inline-flex">
              <a
                href="https://www.creative-tim.com/learning-lab/tailwind/angular/overview/notus"
                target="_blank"
                className="text-blueGray-700 hover:text-blueGray-500 mb-4 block text-sm font-semibold no-underline"
              >
                <i className="fab fa-angular text-blueGray-300 mr-2 text-base"></i>
                Angular
              </a>
            </li>

            <li className="inline-flex">
              <a
                href="https://www.creative-tim.com/learning-lab/tailwind/js/overview/notus"
                target="_blank"
                className="text-blueGray-700 hover:text-blueGray-500 mb-4 block text-sm font-semibold no-underline"
              >
                <i className="fab fa-js-square text-blueGray-300 mr-2 text-base"></i>
                Javascript
              </a>
            </li>

            <li className="inline-flex">
              <a
                href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/overview/notus"
                target="_blank"
                className="text-blueGray-700 hover:text-blueGray-500 mb-4 block text-sm font-semibold no-underline"
              >
                <i className="fab fa-react text-blueGray-300 mr-2 text-base"></i>
                NextJS
              </a>
            </li>

            <li className="inline-flex">
              <a
                href="https://www.creative-tim.com/learning-lab/tailwind/react/overview/notus"
                target="_blank"
                className="text-blueGray-700 hover:text-blueGray-500 mb-4 block text-sm font-semibold no-underline"
              >
                <i className="fab fa-react text-blueGray-300 mr-2 text-base"></i>
                React
              </a>
            </li>

            <li className="inline-flex">
              <a
                href="https://www.creative-tim.com/learning-lab/tailwind/svelte/overview/notus"
                target="_blank"
                className="text-blueGray-700 hover:text-blueGray-500 mb-4 block text-sm font-semibold no-underline"
              >
                <i className="fas fa-link text-blueGray-300 mr-2 text-base"></i>
                Svelte
              </a>
            </li>

            <li className="inline-flex">
              <a
                href="https://www.creative-tim.com/learning-lab/tailwind/vue/overview/notus"
                target="_blank"
                className="text-blueGray-700 hover:text-blueGray-500 mb-4 block text-sm font-semibold no-underline"
              >
                <i className="fab fa-vuejs text-blueGray-300 mr-2 text-base"></i>
                VueJS
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
