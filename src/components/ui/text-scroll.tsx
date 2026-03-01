"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { RefObject } from "react";
import { cn } from "../../lib/utils";

type CharacterProps = {
  char: string;
  index: number;
  centerIndex: number;
  scrollYProgress: any;
};

const CharacterV1 = ({ char, index, centerIndex, scrollYProgress }: CharacterProps) => {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(scrollYProgress, [0, 0.3], [distanceFromCenter * 10, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 40, 0]);

  return (
    <motion.span
      className={cn("inline-block text-white opacity-10", isSpace && "w-4")}
      style={{ x, rotateX }}
    >
      {char}
    </motion.span>
  );
};

export const Aboutme = ({ containerRef }: { containerRef: RefObject<HTMLElement> }) => {
  const { scrollYProgress } = useScroll({ target: containerRef ,  offset: ["start end", "end start"] });

  const text = "ABOUT ME";
  const characters = text.split("");
  const centerIndex = Math.floor(characters.length / 2);

  return (
    <div
      className="text-[40px] md:text-[90px] lg:text-[100px] font-black uppercase tracking-[-0.01em] text-center"
      style={{ perspective: "500px",
               fontFamily: "'Playfair Display', Georgia, serif"
       }}
    >
      {characters.map((char, index) => (
        <CharacterV1
          key={index}
          char={char}
          index={index}
          centerIndex={centerIndex}
          scrollYProgress={scrollYProgress}
        />
      ))}
      {/* Google Fonts import via style tag */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
      `}</style>
    </div>
  );
};