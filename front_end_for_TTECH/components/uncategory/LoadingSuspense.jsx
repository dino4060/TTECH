'use client';
import { Suspense } from "react";

const LoadingSuspense = ({ children }) => {
  return (
    <Suspense fallback={<div className="text-center my-8">Đang tải...</div>}>
      {children}
    </Suspense>
  );
}

export default LoadingSuspense;
