"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { easeIn, motion } from "framer-motion";
import Link from "next/link";

export default function DownloadButton() {
  return (
    <>
      {/* 下載履歷 */}
      <section className="mt-10 flex">
        <Link href="/files/my-resume.pdf" download="my-resume.pdf"></Link>
        <motion.div
          className="group mx-auto flex cursor-pointer items-center gap-0 rounded-xl border border-black px-3 hover:border-myOrange hover:text-myOrange"
          whileHover="hover"
          initial="initial"
        >
          {/* 下載按鈕 */}
          {/* <i className="bx bx-fw bxs-download"></i> */}
          <motion.div
            className="h-14 w-12 overflow-hidden"
            variants={{
              initial: { y: 0 },
              hover: {
                y: -4,
                transition: {
                  type: "spring",
                  stiffness: 300, // 彈簧硬度，越高越快
                  damping: 1, // 適度阻尼,越高彈跳越少
                  mess: 0.1, // 質量，越重越慢
                  visualDuration: 0.03,
                  repeatType: "reverse",
                  bounce: 0.3,
                },
              },
            }}
          >
            <DotLottieReact
              className="relative -left-5 h-20 w-20 translate-y-[-12px]"
              src="/animation/download.json"
              autoplay
            />
          </motion.div>

          {/* 下載PDF文字 */}
          <motion.span
            className="text-lg font-medium tracking-wider"
            variants={{
              initial: { y: 0, opacity: 1 },
              hover: {
                y: [0, 20, -20, 0],
                opacity: [1, 0, 0, 1],
                transition: {
                  repeatDelay: 0.4,
                  duration: 1.3,
                  ease: easeIn,
                  repeat: Infinity,
                },
              },
            }}
          >
            下載PDF
          </motion.span>
        </motion.div>
      </section>
    </>
  );
}
