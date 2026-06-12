"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

// Перенесено з ДЗ-5
// Універсальний компонент модального вікна — може відображати будь-який вміст через children
interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  useEffect(() => {
    // Перенесено з ДЗ-5
    // Поки модалка відкрита — забороняємо скролінг сторінки
    document.body.style.overflow = "hidden";

    // Перенесено з ДЗ-5
    // Закриваємо модалку по натисканню ESC — зручно для клавіатурної навігації
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    // Прибираємо все за собою коли модалка закривається — скрол повертаємо, слухач видаляємо
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // Перенесено з ДЗ-5
  // Закриваємо модалку при кліку на темний фон — але не на саму модалку
  function handleBackdropClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  // Перенесено з ДЗ-5
  // createPortal рендерить модалку прямо в body — поза основним деревом компонентів
  // Завдяки цьому модалка завжди поверх всього контенту незалежно від CSS батьківських елементів
  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>{children}</div>
    </div>,
    document.body,
  );
}
