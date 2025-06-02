import { IconTicket } from "@tabler/icons-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-400 px-24 py-4 flex items-center justify-between mt-6 ">
      <Link href="/" className="flex items-center gap-2">
        <IconTicket stroke={2} className="size-8" />
        <span className="font-semibold text-xl">NearBy</span>
      </Link>
      <div className="items-center text-sm font-semibold">© 2025 NearBy</div>
    </footer>
  );
}
