import { useEffect, useState } from "react";

interface TypingAnimationProps {
    text: string;
  }
  
const TypingAnimation: React.FC<TypingAnimationProps> = ({ text }) => {
    const [displayedText, setDisplayedText] = useState<string>("");
  
    useEffect(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText((prev) => prev + text[index]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }, [text]);
  
    return <span>{displayedText}</span>;
  };

  export default TypingAnimation;