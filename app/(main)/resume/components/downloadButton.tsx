"use client";
import { easeIn, easeInOut, motion } from "framer-motion";

export default function DownloadButton() {
  return (
    <>
      {/* 下載履歷 */}
      <section className="mt-10 flex">
        <a
          href="/files/my-resume.pdf"
          download="my-resume.pdf"
          className="mx-auto"
        >
          <motion.div
            className="group relative mx-auto my-1 flex cursor-pointer flex-col hover:text-myOrange"
            whileHover="hover"
            initial="initial"
          >
            <motion.div
              className="relative my-2 text-lg font-medium tracking-wider"
              variants={{
                initial: { y: 0, opacity: 1 },
                hover: {
                  y: [0, 15, -15, 0],
                  opacity: [1, 0, 0, 1],
                  transition: {
                    delay: 0.7,
                    repeatDelay: 0.4,
                    duration: 1.3,
                    ease: easeIn,
                    repeat: Infinity,
                  },
                },
              }}
            >
              <i className="bx bx-fw bxs-download"></i>
              <span>下載PDF</span>
            </motion.div>
            <div className="relative h-[2px] w-full rounded-full bg-gray-400">
              <motion.div
                className="absolute bottom-0 h-[2px] w-full rounded-full bg-myOrange"
                variants={{
                  initial: { scaleX: 0 },
                  hover: {
                    scaleX: 1,
                    transition: {
                      ease: easeInOut,
                    },
                  },
                }}
              ></motion.div>
            </div>
          </motion.div>
        </a>
      </section>
    </>
  );
}
