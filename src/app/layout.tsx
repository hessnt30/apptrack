import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import { MyAppsProvider } from "@/hooks/useMyApps";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AppTrack - Keep Your Job Search on Track",
  description: "Created by Nicholas Hess",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>AppTrack - Keep Your Job Search on Track</title>
      </head>
      <body>
        <AuthProvider>
          <MyAppsProvider>{children}</MyAppsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
