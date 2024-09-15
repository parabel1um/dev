"use client";

import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import React from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function Home() {
  const [scrolled, setScrolled] = useState(0);
  const [scrolledElement, setScrolledElement] = useState(1);

  const elements = {
    h1: { tag: "h1", text: "Heading 1", size: "text-4xl" },
    h2: { tag: "h2", text: "Heading 2", size: "text-3xl" },
    h3: { tag: "h3", text: "Heading 3", size: "text-2xl" },
    h4: { tag: "h4", text: "Heading 4", size: "text-xl" },
    h5: { tag: "h5", text: "Heading 5", size: "text-lg" },
    h6: { tag: "h6", text: "Heading 6", size: "text-base" },
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const maxScrollableHeight = window.innerHeight * 3 + 500;
    const index = Math.ceil((scrollPosition / maxScrollableHeight) * 6);

    setScrolledElement(Math.max(1, Math.min(index, 6)));
    setScrolled(scrollPosition);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="h-[300vh] w-full">
      <div className="bg-slate-900 w-full h-full flex justify-center">
        <div className="sticky top-0 h-screen w-3/4 bg-slate-600 flex">
          <div className="w-full h-full flex flex-col items-center justify-center">
            {Object.entries(elements).map(([key, { tag, text, size }], index) => {
              const isActive = scrolledElement === index;
              return (
                <div key={index} className={`transition-all duration-300 ${isActive ? 'text-yellow-500' : 'text-white'} ${size}`}>
                  {React.createElement(tag, null, text)}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
