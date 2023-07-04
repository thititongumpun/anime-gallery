import Link from "next/link";
import React from "react";

type Props = {
  statSubtitle: string;
  statTitle: number;
  statIcon: any;
  statIconColor: string;
  href: string;
};

export default function CardStats({
  statTitle,
  statSubtitle,
  statIcon,
  statIconColor,
  href,
}: Props) {
  return (
    <>
      <Link href={href}>
        <div className="relative mb-6 flex min-w-0 cursor-pointer flex-col break-words rounded border-gray-300 shadow-md hover:shadow-lg dark:border xl:mb-0">
          <div className="flex-auto p-4">
            <div className="flex flex-wrap">
              <div className="relative w-full max-w-full flex-1 flex-grow pr-4">
                <h5 className="text-xs font-bold uppercase">{statSubtitle}</h5>
                <span className=" text-lg font-semibold">{statTitle}</span>
              </div>
              <div className="relative w-auto flex-initial pl-4">
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-full p-3 text-center shadow-lg ${statIconColor}`}
                >
                  {statIcon}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
