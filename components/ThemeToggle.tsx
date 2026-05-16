"use client";

import React, { useState } from "react";
import { FaMoon, FaRegMoon } from "react-icons/fa";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  const toggle = () => {
    setIsDark(!isDark);

    // نغير class على الـ body
    if (isDark) {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  };

  return (
    <button className="absolute right-5 top-5 cursor-pointer" onClick={toggle}>
      {isDark ? <FaRegMoon /> : <FaMoon />}
    </button>
  );
}
