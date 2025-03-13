"use client";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const [headerHidden, setHeaderHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // 獲取前一個值
    const previous = scrollY.getPrevious() ?? 0;

    // 如果向下滾動，隱藏 header；向上滾動，顯示 header
    if (latest > previous && latest > 100) {
      setHeaderHidden(true);
    } else {
      setHeaderHidden(false);
    }
  });

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden"); // 開啟行動版選單後禁止捲動
    } else {
      document.body.classList.remove("overflow-hidden"); // 恢復捲動
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <motion.header
      className="sticky top-0 z-50 flex select-none justify-between px-3 py-10"
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
        <div className="flex flex-col align-middle">
          <span className="text-center text-[20px] font-medium tracking-widest">
            周哲緯
          </span>
          <span className="mx-auto w-auto text-[12px] font-normal leading-3 tracking-[0.5px]">
            Zhou zhe wei
          </span>
        </div>
      </Link>
      {/* 主要LOGO */}

      {/* 電腦版選單 */}
      <nav className="mx-10 hidden flex-row items-center md:flex">
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
        <div className="relative h-6 w-6 transition-all duration-300 hover:scale-125 hover:text-myOrange">
          <i
            className={`bx bx-sm bx-menu absolute inset-0 transition-opacity duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`}
          ></i>
          <i
            className={`bx bx-sm bx-x absolute inset-0 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
          ></i>
        </div>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center bg-white bg-opacity-75"
            onClick={toggleMenu}
          ></div>
          <nav className="absolute right-[calc(50%-43px)] top-96 flex flex-col border border-black bg-white p-6 md:right-[calc(50%-60px)]">
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
        </>
      )}

      {/* 移動版漢堡式選單 */}
    </motion.header>
  );
}
