// components/ScrollReveal.tsx
import React from "react";
import { useInView } from "react-intersection-observer";

const ScrollReveal: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1, // Tỉ lệ để kích hoạt (10%)
  });

  return (
    <div
      ref={ref}
      className={`transform transition-transform duration-500 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}>
      {children}
    </div>
  );
};

export default ScrollReveal;
