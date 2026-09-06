"use client";

import { useEffect } from "react";

/**
 * ImageProtection Component
 * Protects portfolio and client images from right-click downloading, dragging, and inspect-saving.
 */
export default function ImageProtection() {
  useEffect(() => {
    // Prevent right-click on all images and galleries
    const handleContextMenu = (e) => {
      if (
        e.target.tagName === "IMG" ||
        e.target.closest("img") ||
        e.target.closest("[data-protect-image]") ||
        e.target.closest(".lightbox-image-container")
      ) {
        e.preventDefault();
        return false;
      }
    };

    // Prevent dragging images
    const handleDragStart = (e) => {
      if (e.target.tagName === "IMG" || e.target.closest("img")) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
    };
  }, []);

  return null;
}
