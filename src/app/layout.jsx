import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "./contexts/AuthContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NearBy",
  description: "Find events near you",
};

export default function RootLayout(props) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>{props.children}</AuthProvider>
      </body>
    </html>
  );
}
