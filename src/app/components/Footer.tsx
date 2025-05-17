import { IconTicket } from "@tabler/icons-react";

export default function Footer() {
  return (
    <footer className="w-full border px-24 py-4 flex items-center justify-between my-6">
      <div className="flex items-center gap-2">
        <IconTicket stroke={2} className="size-8" />
        <span className="font-semibold text-xl">NearBy</span>
      </div>
      <div className="items-center text-sm font-semibold">© 2025 NearBy</div>
    </footer>
  );
}
