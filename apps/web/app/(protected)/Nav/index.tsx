"use client";

import styles from "./index.module.scss";
import CompassIcon from "@/public/compass.svg";
import TranslateIcon from "@/public/translate.svg";
import CoinIcon from "@/public/coin.svg";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MotionLink = motion(Link);

export default function Nav() {
  const pathname = usePathname();

  const tabs = [
    { icon: <CompassIcon />, path: "/home", colour: "#561845" },
    { icon: <TranslateIcon />, path: "/translate", colour: "#348CB4" },
    { icon: <CoinIcon />, path: "/pay", colour: "#5BBB5F" },
  ];

  return (
    <div className={styles.nav}>
      {tabs.map((tab) => {
        return (
          <MotionLink
            key={tab.path}
            href={tab.path}
            className={"relative rounded-full py-[10px] px-[16px]"}
            initial={{
              opacity: 0,
              //translateY: !showService ? -25 : 25,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              //translateY: 0,
              scale: 1,
            }}
            exit={{ opacity: 0 }}
            transition={{
              ease: "easeInOut",
              duration: 0.25,
            }}
          >
            <AnimatePresence>
              {pathname.includes(tab.path) ? (
                <motion.span
                  className="absolute inset-0 z-10 rounded-[16px]"
                  style={{ backgroundColor: tab.colour }}
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: {
                      duration: 0.15,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    transition: {
                      duration: 0.15,
                      delay: 0.2,
                    },
                  }}
                />
              ) : null}
            </AnimatePresence>
            <span
              style={{
                color: pathname.includes(tab.path) ? "#fff" : "#525252",
              }}
              className="relative z-20"
            >
              {tab.icon}
            </span>
          </MotionLink>
        );
      })}
    </div>
  );
}
