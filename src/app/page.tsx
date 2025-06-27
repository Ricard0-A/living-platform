"use client";
import Image from "next/image";

import { url } from "inspector";

export default function Home() {
  return (
    //  My Home
    <div
      className="h-200 w-full mt-[-3.9rem]"
      style={{
        backgroundImage: "url(./uk-home-opacity-50.png)",
        backgroundPosition: "center",
      }}
    >
      {/* Features Nav */}
      <div className="flex justify-between">
        {/* Logo Box  */}
        <div className="w-60 h-60 relative -top-8">
          <Image alt="Lively Place Logo" fill src={"/logo-brand.png"} />
        </div>

        {/* Features */}
      </div>
    </div>
  );
}
