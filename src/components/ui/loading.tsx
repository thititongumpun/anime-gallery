import React from "react";

export default function Loading() {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="flex items-center justify-center space-x-2">
        <div className="h-4 w-4 animate-pulse rounded-full bg-violet-400"></div>
        <div className="h-4 w-4 animate-pulse rounded-full bg-violet-400"></div>
        <div className="h-4 w-4 animate-pulse rounded-full bg-violet-400"></div>
      </div>
    </main>
  );
}
