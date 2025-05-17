import { IconMapPin, IconSearch, IconTicket } from "@tabler/icons-react";

const NavItems = [
  { name: "Create Event", href: "#" },
  { name: "Sign Up", href: "#" },
  { name: "Log In", href: "#" },
];

export default function Header() {
  return (
    <header className="top-0 w-full flex">
      <div className="flex gap-40 items-center justify-between border-b border-gray-500 w-full p-4 px-30 mb-6">
        <a className="flex gap-2 justify-center items-center text-lg font-semibold">
          <IconTicket stroke={2} className="size-10" />
          <h2>NearBy</h2>
        </a>
        <div className="flex gap-2 justify-center items-center border border-gray-400 rounded-lg p-2">
          <IconSearch stroke={2} className="size-5" />
          <input type="text" className="w-[240px] px-1 border-0 outline-0" />
          <span className="text-xl text-gray-600/50">|</span>
          <IconMapPin stroke={2} className="size-5" />
          <input type="text" className="w-[140px] px-1 border-0 outline-0" />
        </div>
        <div className="flex gap-4 justify=center items-center">
          {NavItems.map((item, index) => (
            <a key={index} className="hover:bg-gray-300 p-2 rounded-md font-semibold text-sm" href={item.href}>
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
