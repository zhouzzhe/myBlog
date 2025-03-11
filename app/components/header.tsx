"use client";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";

export default function Header() {
  const [headerHidden, setHeaderHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // 獲取前一個值
    const previous = scrollY.getPrevious() ?? 0;
    // console.log(previous);

    // 如果向下滾動，隱藏 header；向上滾動，顯示 header
    if (latest > previous && latest > 100) {
      setHeaderHidden(true);
    } else {
      setHeaderHidden(false);
    }
  });

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <motion.header
      className="sticky top-0 flex justify-between px-3 py-10"
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={headerHidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "linear" }}
    >
      {/* 主要LOGO */}
      <Link
        href="/"
        className="mx-10 px-3 py-1 transition-all hover:scale-105 hover:text-myOrange"
      >
        HOME
      </Link>
      {/* 主要LOGO */}

      {/* 電腦版選單 */}
      <nav className="mx-10 hidden flex-row md:flex">
        {["Resume", "|", "Album", "|", "Contact"].map((item, index) =>
          item === "|" ? (
            <div key={index} className="mx-3 px-3 py-1">
              {item}
            </div>
          ) : item === "Album" ? (
            <Link
              href="https://zhouzzhe.github.io/Home.html"
              key={index}
              className="mx-3 cursor-pointer px-3 py-1 transition-all hover:scale-105 odd:hover:text-myOrange"
            >
              Album
            </Link>
          ) : (
            <Link
              href={`/${item.toLowerCase()}`}
              key={index}
              className="mx-3 cursor-pointer px-3 py-1 transition-all hover:scale-105 odd:hover:text-myOrange"
            >
              {item}
            </Link>
          ),
        )}
      </nav>
      {/* 電腦版選單 */}

      {/* 移動版漢堡式選單 */}
      <button className="z-50 mx-10 px-3 py-1 md:hidden" onClick={toggleMenu}>
        <div className="relative h-6 w-6 transition-all duration-300 hover:scale-125">
          <i
            className={`bx bx-sm bx-menu absolute inset-0 transition-opacity duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`}
          ></i>
          <i
            className={`bx bx-sm bx-x absolute inset-0 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
          ></i>
        </div>
      </button>

      {isOpen && (
        <div
          className="fixed -top-20 bottom-0 left-0 right-0 flex flex-col items-center justify-center bg-white bg-opacity-60"
          onClick={toggleMenu}
        >
          <nav className="flex flex-col border border-black bg-white p-6">
            {["Resume", "Album", "Contact"].map((item) =>
              item === "Album" ? (
                <Link
                  href="https://zhouzzhe.github.io/Home.html"
                  key={item}
                  className="group m-5 cursor-pointer border-b border-black text-center text-lg hover:scale-105"
                  onClick={toggleMenu} // 點擊選項關閉選單
                >
                  {item}
                  <span className="absolute -bottom-[1px] left-1/2 h-[1px] w-0 -translate-x-1/2 bg-myOrange transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ) : (
                <Link
                  href={`/${item.toLocaleLowerCase()}`}
                  key={item}
                  className="group m-5 cursor-pointer border-b border-black text-center text-lg hover:scale-105"
                  onClick={toggleMenu} // 點擊選項關閉選單
                >
                  {item}
                  <span className="absolute -bottom-[1px] left-1/2 h-[1px] w-0 -translate-x-1/2 bg-myOrange transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ),
            )}
          </nav>
        </div>
      )}
      {/* 移動版漢堡式選單 */}
    </motion.header>
  );
}
