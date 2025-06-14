import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const DarkTopSearch = ({ value, onChange }: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <motion.div
      onClick={() => {
        setIsFocused(true);
        if (!isFocused) {
          setTimeout(() => {
            inputRef.current?.focus();
          }, 100);
        }
      }}
      className={cn("flex items-center absolute h-11 justify-end")}
      animate={{
        width: isFocused ? "calc(100% - 40px)" : "44px",
        right: isFocused ? "auto" : 20,
        left: isFocused ? 20 : "auto",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.4,
      }}
    >
      <div
        className={cn(
          "relative  w-full",
          isFocused ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <input
          ref={inputRef}
          disabled={!isFocused}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          className={cn(
            "focus:outline-none border-white  border h-11 rounded-full p-3 bg-black w-full",
            isFocused ? "pl-10 text-white" : "text-transparent"
          )}
        />
        <motion.div
          className="text-white absolute top-1/2 -translate-y-1/2 pointer-events-none"
          animate={{
            right: isFocused ? "auto" : 10,
            left: isFocused ? 10 : "auto",
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.4,
          }}
        >
          <Search />
        </motion.div>
      </div>
    </motion.div>
  );
};
