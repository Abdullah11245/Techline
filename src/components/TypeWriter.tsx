import React, { useEffect, useState } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  deleteSpeed?: number;
  delay?: number;
  className?: string;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 100,
  deleteSpeed = 50,
  delay = 1500,
  className = '',
}) => {
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;

    if (!isDeleting && displayed.length < text.length) {
      // Typing
      timeout = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, speed);

    } else if (!isDeleting && displayed.length === text.length) {
      // Wait before deleting
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, delay);

    } else if (isDeleting && displayed.length > 0) {
      // Deleting
      timeout = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length - 1));
      }, deleteSpeed);

    } else if (isDeleting && displayed.length === 0) {
      // Restart typing
      setIsDeleting(false);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [displayed, isDeleting, text, speed, deleteSpeed, delay]);

  return (
    <span className={className}>
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
};