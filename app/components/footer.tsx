"use client";
import Link from "next/link";
import "boxicons/css/boxicons.min.css";
import { useEffect, useRef, useState } from "react";
import { easeIn, motion } from "framer-motion";

// 可重用的聯絡資訊元件
interface ContactInfoProp {
  label: string;
  content: string;
  className?: string;
}
function ContactInfo({ label, content, className }: ContactInfoProp) {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const [isClick, setIsClick] = useState<boolean>(false);

  // 頁面看到footer的50%之後，會啟動動畫
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsAnimating(true);
        } else {
          setIsAnimating(false);
        }
      },
      { threshold: 0.5 },
    );
    if (titleRef.current) {
      observer.observe(titleRef.current);
    }
    // 清除觀察器
    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  // 點擊email會複製zzhe828@gmail.com，並啟動動畫
  const copyEmail = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log(`已複製！${text}`);
    } catch (error) {
      console.log("無法複製");
    }
  };

  const handleClick = () => {
    if (isClick) return; // 防止重複點擊
    setIsClick(true);
    setTimeout(() => {
      setIsClick(false);
    }, 1000);
  };

  return (
    <motion.div
      ref={titleRef}
      className="group m-5 cursor-pointer transition-all hover:scale-105"
      initial="initial"
      onClick={handleClick}
    >
      <i
        className={`bx ${isAnimating ? "bx-tada" : ""} bx-fw bx-sm ${label} ${className} group-hover:text-myOrange`}
        style={{
          animationIterationCount: "1",
          animationDuration: "800ms",
          animationName: isAnimating ? "tada" : "none",
        }}
      ></i>
      <span>：</span>
      {content.includes("@") ? (
        <>
          <motion.div
            className={`inline-block ${isClick ? "hidden" : ""}`}
            onClick={() => copyEmail(content)}
            initial={{ y: 0, opacity: 1 }}
            animate={
              isClick
                ? {
                    y: [0, 15, -15, 0],
                    opacity: [1, 0, 0, 1],
                    transition: {
                      repeatDelay: 0.4,
                      duration: 1.3,
                      ease: easeIn,
                      repeat: 1,
                    },
                  }
                : "initial"
            }
          >
            {content}
          </motion.div>
          <motion.div
            className={`inline-block rounded-lg border-[1.5px] border-myOrange px-2 text-myOrange ${!isClick ? "hidden" : ""}`}
            initial={{ y: 0, opacity: 0 }}
            animate={
              isClick
                ? {
                    y: [-15, 0, 0, 15],
                    opacity: [0, 1, 1, 0],
                    transition: {
                      repeatDelay: 0.4,
                      duration: 1,
                      ease: easeIn,
                      repeat: 1,
                    },
                  }
                : "initial"
            }
          >
            已複製！
          </motion.div>
        </>
      ) : (
        <>{content}</>
      )}
    </motion.div>
  );
}

export default function Footer() {
  return (
    <footer className="mt-auto select-none">
      {/* 固定文字 */}
      {/* <div
        className="fixed -z-20 flex rotate-2 flex-col justify-center"
        style={{
          top: "calc(3rem + 30vw)",
          left: "calc(-2rem + 25vw)",
        }}
      >
        <span className="text-6xl font-medium">周哲緯</span>
        <span className="mx-auto w-auto text-xl font-normal tracking-widest">
          Zhou zhe wei
        </span>
      </div> */}
      {/* 固定文字 */}

      {/* 聯絡資訊 */}
      <div className="mx-20 flex flex-col items-start justify-between border-t-2 border-black px-8 pb-8 pt-2 md:flex-row md:items-center">
        {/* <ContactInfo label="bx-mobile" content="0963912230" /> */}
        <ContactInfo label="bx-envelope" content="zzhe828@gmail.com" />
        <Link
          href="https://www.instagram.com/zzhe__/"
          className="cursor-default"
        >
          <ContactInfo label="bxl-instagram" content="zzhe__" />
        </Link>
      </div>
      {/* 聯絡資訊 */}
    </footer>
  );
}
