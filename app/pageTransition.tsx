"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const variants = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  enter: { opacity: 1, filter: "blur(0px)" },
  exit: { opacity: 0, filter: "blur(10px)" },
};

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  return (
    <AnimatePresence>
      <motion.div
        variants={variants}
        initial="hidden"
        animate="enter"
        // exit="exit"
        transition={{ duration: 0.4, ease: "linear" }}
        key={pathName}
        className="flex flex-col flex-grow"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
