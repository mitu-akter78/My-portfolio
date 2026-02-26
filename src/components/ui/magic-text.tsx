"use client"

import * as React from "react"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export interface MagicTextProps {
  text: string;
}

interface WordProps {
  children: string;
  progress: any;
  range: number[];
}

const Word: React.FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="relative inline-block mr-[0.25em] align-baseline">
      <span className="absolute left-0 top-0 opacity-20">{children}</span>
      <motion.span className="relative" style={{ opacity }}>{children}</motion.span>
    </span>
  );
};

export const MagicText: React.FC<MagicTextProps> = ({ text }) => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"],
  });

  const words = text.split(" ");

  return (
    <span ref={container} className="relative">
      {words.map((word, i) => {
        if (word === "<br/>") {
          return <br key={i} />;
        }

        const start = i / words.length;
        const end = start + 1 / words.length;

        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </span>
  );
};