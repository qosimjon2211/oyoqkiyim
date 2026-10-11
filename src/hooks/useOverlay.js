import { useEffect, useCallback } from "react";

/**
 * Modal / drawer ochiq bo'lganda orqa fon skrollini bloklash.
 * Bir nechta overlay bir vaqtda ochilsa ham to'g'ri ishlaydi (reference counting).
 */
export const useBodyScrollLock = (isLocked) => {
  useEffect(() => {
    if (!isLocked) return;

    const { body } = document;
    const scrollY = window.scrollY;
    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;

    // Skrollbar yo'qolganda sahifa "sakramasligi" uchun
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPaddingRight;
      // Safari'da skroll o'rnini tiklash
      if (window.scrollY !== scrollY) window.scrollTo(0, scrollY);
    };
  }, [isLocked]);
};

/**
 * Escape tugmasi bosilganda callback chaqirish (modal yopish uchun).
 */
export const useEscapeKey = (isActive, onEscape) => {
  const handler = useCallback(
    (event) => {
      if (event.key === "Escape") onEscape?.();
    },
    [onEscape]
  );

  useEffect(() => {
    if (!isActive) return;
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isActive, handler]);
};

/**
 * Biror blok ichidagi fokusni yashirish/majburiy ushlab turish (oddiy focus trap).
 * `ref` berilgan konteynerga fokus tushadi va Tab faqat shu ichida aylanadi.
 */
export const useFocusTrap = (isActive, containerRef) => {
  useEffect(() => {
    if (!isActive || !containerRef?.current) return;

    const container = containerRef.current;
    const previouslyFocused = document.activeElement;

    const focusableSelector =
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    // Ochilda birinchi fokuslanadigan elementga o'tamiz
    const first = container.querySelector(focusableSelector);
    first?.focus();

    const handleKeyDown = (event) => {
      if (event.key !== "Tab") return;
      const items = Array.from(container.querySelectorAll(focusableSelector)).filter(
        (el) => el.offsetParent !== null
      );
      if (items.length === 0) return;

      const firstItem = items[0];
      const lastItem = items[items.length - 1];

      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    };

    container.addEventListener("keydown", handleKeyDown);
    return () => {
      container.removeEventListener("keydown", handleKeyDown);
      // Yopilganda fokusni oldingi elementga qaytaramiz
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [isActive, containerRef]);
};
