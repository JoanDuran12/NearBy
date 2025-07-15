"use client";

import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { IconTicket, IconUser, IconHome } from "@tabler/icons-react";

export default function Footer() {
  const { currentUser } = useAuth();

  const NavItems = [
    { name: "Home", href: "/home", icon: IconHome },
    { name: "Events", href: "/events", icon: IconTicket },
    { name: "Profile", href: "/user", icon: IconUser },
  ];

  // If currentUser is falsey, show the footer
  if (!currentUser) {
    return (
      <footer className="w-full border-t border-gray-400 py-4 px-4 md:px-24 gap-2">
        <div className="flex flex-col items-center justify-center md:justify-between md:flex-row">
          <Link href="/" className="flex items-center gap-2">
            <IconTicket stroke={2} className="size-6" />
            <span className="font-semibold text:sm md:text-xl">NearBy</span>
          </Link>
          <div className="items-center text-xs md:text-sm font-semibold">
            Make with ❤️ by NearBy | © 2025
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="w-full border-t border-gray-400 py-4 px-4 md:px-24 gap-2">
      <div className="flex flex-col items-center justify-center md:justify-between md:flex-row max-xl:hidden">
        <Link href="/" className="flex items-center gap-2">
          <IconTicket stroke={2} className="size-6" />
          <span className="font-semibold text:sm md:text-xl">NearBy</span>
        </Link>
        <div className="items-center text-xs md:text-sm font-semibold">
          Make with ❤️ by NearBy | © 2025
        </div>
      </div>
      <div className="xl:hidden">
        {currentUser && (
          <div className="flex justify-between gap-10">
            {NavItems.map((item, index) => (
              <Link
                key={index}
                className="flex justify-center gap-1 items-center hover:bg-gray-300 p-2 rounded-md font-semibold text-sm md:text-lg"
                href={item.href}
              >
                <item.icon className="size-4 md:size-6" />
                {item.name}
              </Link>
            ))}
          </div>
        )} 
      </div>
    </footer>
  );
}
