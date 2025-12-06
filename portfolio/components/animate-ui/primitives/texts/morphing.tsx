"use client";

import { useEffect, useMemo, useState } from "react";

export interface MorphingTextProps {
  text: string[];
  loop?: boolean;
  holdDelay?: number;
  className?: string;
}

export const MorphingText = ({
  text,
  loop = true,
  holdDelay = 2000,
  className = "",
}: MorphingTextProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!loop && index === text.length - 1) {
      return;
    }

    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % text.length);
    }, holdDelay);

    return () => clearTimeout(timer);
  }, [index, holdDelay, loop, text.length]);

  const letters = useMemo(() => text[index].split(""), [text, index]);

  return (
    <div className={`${className} morphing-text`}>
      {letters.map((letter, letterIndex) => (
        <span
          key={`${letter}-${letterIndex}`}
          style={{ animationDelay: `${letterIndex * 0.06}s` }}
        >
          {letter}
        </span>
      ))}
    </div>
  );
};

const texts = [
  "Dhanuka  R",
];

interface MorphingTextDemoProps {
  loop: boolean;
  holdDelay: number;
  className?: string;
}

export const MorphingTextDemo = ({ loop, holdDelay, className }: MorphingTextDemoProps) => {
  return <MorphingText text={texts} loop={loop} holdDelay={holdDelay} className={className} />;
};
