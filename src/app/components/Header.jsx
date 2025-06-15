"use client";

import {
  IconTicket,
  IconUser,
  IconLogout,
  IconSettings,
  IconHome,
  IconMapPin,
  IconLogin,
} from "@tabler/icons-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Settings from "@/app/components/Settings";

const NavItems = [
  { name: "Home", href: "/home", icon: IconHome },
  // { name: "Discover", href: "/discover", icon: IconMapPin },
  { name: "Events", href: "/events", icon: IconTicket },
  { name: "Profile", href: "/user", icon: IconUser },
];

const GuestNavItems = [
  { name: "Sign Up", href: "/signup", icon: IconLogin },
  { name: "Log In", href: "/login", icon: IconLogin },
];

export default function Header() {
  const { currentUser, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [settingDropDown, setSettingDropDown] = useState(false);
  // const [loading, setLoading] = useState(true);
  // const [userData, setUserData] = useState(null);
  const dropdownRef = useRef(null);

  // Get user data from API once when component mounts or currentUser changes
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       if (currentUser?.uid) {
  //         const response = await fetch(`/api/user/${currentUser.uid}`);
  //         if (!response.ok) {
  //           throw new Error("Failed to fetch user data");
  //         }
  //         const data = await response.json();
  //         setUserData(data.user);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  // Add useEffect to monitor auth state changes
  useEffect(() => {
    console.log("Header: Auth State Changed:");
    console.log(
      "User:",
      currentUser
        ? {
            email: currentUser.email,
            displayName: currentUser.displayName,
          }
        : "Not logged in"
    );
  }, [currentUser]);

  // Handle Setting close
  const handleSettingsClose = () => {
    setSettingDropDown(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // if (loading) return <div className="hidden">Loading</div>;
  return (
    <header>
      <div className="top-0 flex gap-40 items-center justify-between border-b border-gray-400 w-full p-4 px-18 mb-6">
        {/* Logo and Title */}
        <Link
          className="flex gap-1 justify-center items-center text-2xl font-bold"
          href="/"
        >
          <IconTicket stroke={2} className="size-8" />
          <h2>NearBy</h2>
        </Link>
        {/* Nav Var main Auth menu */}
        {currentUser && (
          <div className="flex">
            {NavItems.map((item, index) => (
              <Link
                key={index}
                className="flex justify-center gap-1 items-center hover:bg-gray-300 p-2 px-6 rounded-md font-semibold text-md"
                href={item.href}
              >
                <item.icon className="size-6" />
                {item.name}
              </Link>
            ))}
          </div>
        )}
        <div className="flex gap-4 justify-center items-center">
          {/*Show discover or create buttom depending on user Auth state */}
          <Link
            className="hover:bg-gray-300 p-2 rounded-md font-semibold text-sm"
            // href={currentUser ? "/create" : "/discover"}
            href={currentUser ? "/create" : ""}
          >
            {/* {currentUser ? "Create Event" : "Explore Events"} */}
            {currentUser ? "Create Event" : ""}
          </Link>
          {currentUser ? (
            // Authenticated user menu
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 hover:bg-gray-300 px-2 py-1 rounded-md font-semibold text-base"
              >
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt="Profile"
                    className="size-10 rounded-xl object-cover"
                  />
                ) : (
                  <div className="size-8 bg-gray-400 rounded-full flex items-center justify-center">
                    <IconUser stroke={2} className="size-5 text-white" />
                  </div>
                )}
                <span className="hidden sm:block">
                  {currentUser.displayName || "User"}
                </span>
              </button>

              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-300 z-50">
                  <div className="p-1">
                    <div className="px-2 py-2 text-base text-gray-700 border-b border-gray-100 font-semibold">
                      <div className="font-medium">
                        {currentUser.displayName || "User"}
                      </div>
                      <div className="text-gray-500 text-xs font-semibold">
                        {currentUser.email}
                      </div>
                    </div>
                    <button
                      className="flex items-center gap-2 w-full px-2 py-2 text-base text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setSettingDropDown(true);
                        setIsDropdownOpen(!isDropdownOpen);
                      }}
                    >
                      <IconSettings stroke={2} className="size-4" />
                      Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2  w-full px-2 py-2 text-base text-red-600 hover:bg-gray-100"
                    >
                      <IconLogout stroke={2} className="size-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Log in/Sign Up links for guests
            GuestNavItems.map((item, index) => (
              <Link
                key={index}
                className="flex items-center gap-2 hover:bg-gray-300 py-2 px-2 rounded-md font-semibold text-md"
                href={item.href}
              >
                {item.icon && <item.icon className="size-6" />}
                {item.name}
              </Link>
            ))
          )}
        </div>
        {settingDropDown && <Settings onClose={handleSettingsClose} />}
      </div>
    </header>
  );
}
