import { useState, useEffect } from 'react';

export function useTypingEffect(text: string, speed: number = 60, pause: number = 1500) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (isTyping && displayedText.length < text.length) {
      timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
    } else if (isTyping && displayedText.length === text.length) {
      setIsTyping(false);
      timeout = setTimeout(() => {
        setDisplayedText("");
        setIsTyping(true);
      }, pause);
    }
    
    return () => clearTimeout(timeout);
  }, [displayedText, isTyping, text, speed, pause]);

  return displayedText;
}
