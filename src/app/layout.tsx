// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Scope Tube",
//   description: "A Video Player App",
// };

// // export default function RootLayout({
// //   children,
// // }: Readonly<{
// //   children: React.ReactNode;
// // }>) {
// //   return (
// //     <html lang="en">
// //       <body
// //         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
// //       >
// //         {children}
// //       </body>
// //     </html>
// //   );
// // }

// import "./globals.css";
// import { NavBar } from "./components/NavBar";

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body
//         className={`flex min-h-screen bg-gray-50 ${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         <NavBar />
//         <main className="flex-1 overflow-y-auto">{children}</main>

//         {/* <main className="flex-1">{children}</main> */}
//       </body>
//     </html>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from "./components/NavBar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSplash, setShowSplash] = useState(true);

  // Auto-hide splash after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <body
        className={`flex min-h-screen bg-gray-50 ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* NavBar always visible */}
        <NavBar />

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto relative">
          {/* Splash overlay */}
          {showSplash && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-blue-600 text-white transition-opacity duration-500">
              <h1 className="text-5xl font-bold mb-4">Scopetube</h1>
              <p className="text-xl mb-8">Your Educational Video App</p>

              {/* Animated loader dots */}
              <div className="flex space-x-2">
                <div className="w-4 h-4 bg-white rounded-full animate-bounce delay-0"></div>
                <div className="w-4 h-4 bg-white rounded-full animate-bounce delay-200"></div>
                <div className="w-4 h-4 bg-white rounded-full animate-bounce delay-400"></div>
              </div>

              <button
                className="mt-10 px-6 py-3 bg-white text-blue-600 font-semibold rounded hover:bg-gray-100 transition"
                onClick={() => setShowSplash(false)}
              >
                Enter App
              </button>
            </div>
          )}

          {/* Actual page content */}
          <div
            className={`transition-opacity duration-700 ${
              showSplash ? "opacity-0" : "opacity-100"
            }`}
          >
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
