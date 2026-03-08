import { useState, useEffect, useRef } from "react";

export function useStreamingText(
  targetText: string,
  isStreaming: boolean,
  chunkSize = 4,
  intervalMs = 20,
) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDone, setIsDone] = useState(false);
  const posRef = useRef(0);

  useEffect(() => {
    if (!isStreaming) {
      setDisplayedText(targetText);
      setIsDone(true);
      posRef.current = targetText.length;
      return;
    }

    setDisplayedText("");
    setIsDone(false);
    posRef.current = 0;

    const timer = setInterval(() => {
      posRef.current = Math.min(posRef.current + chunkSize, targetText.length);
      setDisplayedText(targetText.slice(0, posRef.current));

      if (posRef.current >= targetText.length) {
        clearInterval(timer);
        setIsDone(true);
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [targetText, isStreaming, chunkSize, intervalMs]);

  return { displayedText, isDone };
}
