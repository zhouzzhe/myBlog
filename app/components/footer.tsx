"use client";
import Link from "next/link";
import "boxicons/css/boxicons.min.css";
import { useEffect, useRef, useState } from "react";

// 可重用的聯絡資訊元件
interface ContactInfoProp {
  label: string;
  content?: string;
  className?: string;
  children?: React.ReactNode;
}
function ContactInfo({ label, content, children, className }: ContactInfoProp) {
  const [isAnimating, setIsAnimating] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);

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

  const copyEmail = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log(`已複製！${text}`);
    } catch (error) {
      console.log("無法複製");
    }
  };

  return (
    <div
      className="group m-5 cursor-pointer transition-all hover:scale-105"
      ref={titleRef}
    >
      <i
        className={`bx ${isAnimating ? "bx-tada" : ""} bx-fw bx-sm ${label} ${className} group-hover:text-myOrange`}
        style={{
          animationIterationCount: "1",
          animationDuration: "800ms",
          animationName: isAnimating ? "tada" : "none",
        }}
      ></i>
      {content && <span onClick={() => copyEmail(content)}>：{content}</span>}
      {children}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="mt-auto">
      {/* 固定文字 */}
      <div
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
      </div>
      {/* 固定文字 */}

      {/* 聯絡資訊 */}
      <div className="mx-20 flex flex-col items-start justify-between border-t-2 border-black px-8 pb-8 pt-2 md:flex-row md:items-center">
        <ContactInfo label="bx-mobile" content="0963912230" />
        <ContactInfo label="bx-envelope" content="zzhe828@gmail.com" />
        <Link href="https://www.instagram.com/zzhe__/" className="cursor-default">
          <ContactInfo label="bxl-instagram" content="zzhe__" />
        </Link>
      </div>
      {/* 聯絡資訊 */}
    </footer>
  );
}
