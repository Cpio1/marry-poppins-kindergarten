"use client";

/** Год вычисляется в браузере, чтобы копирайт не устаревал на статически собранной странице. */
export function CurrentYear() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}
