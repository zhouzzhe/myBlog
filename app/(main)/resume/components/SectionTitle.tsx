"use client";
import { motion } from "motion/react";
import { useEffect, useState, useRef } from "react";

// 標題
export function SectionTitle({ label }: { label: string }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  // console.log(titleRef);

  // 設置 Intersection Observer 監聽元素是否進入視窗
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        // 當元素進入視窗時觸發動畫
        if (entry.isIntersecting) {
          setIsAnimating(true);
          // 一旦觸發動畫，就不再需要觀察
          observer.unobserve(entry.target);
        }
      },
      {
        // 設定觸發閾值，0.5 表示元素須有 50% 進入視窗才觸發
        threshold: 0.5,
        // 可增加觸發緩衝區 (rootMargin)
      },
    );

    // 開始觀察
    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    // 清理函數
    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  return (
    <div className="mb-10 flex justify-center" ref={titleRef}>
      <div className="relative">
        <div className="relative z-10 px-4 py-[2px] text-center text-3xl font-bold text-white mix-blend-difference">
          {label}
        </div>
        <motion.div
          className="absolute inset-0 z-0 bg-black"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isAnimating ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ originX: 0 }}
        />
      </div>
    </div>
  );
}
