"use client";

import { useRouter } from "next/navigation";
import type { Note } from "../../../../types/note";
import Modal from "../../../../components/Modal/Modal";
import css from "./NotePreview.module.css";

// Описуємо що очікуємо від батьківського компонента
interface NotePreviewModalProps {
  note: Note;
}

export default function NotePreviewModal({ note }: NotePreviewModalProps) {
  // Ця частина коду взята з конспекту — "Перехоплення маршрутів"
  // Закриваємо модалку через router.back() — повертаємось на попередню сторінку
  // Це реальний маршрут тому просто повертаємось назад в історії
  const router = useRouter();

  // Показуємо деталі нотатки в модальному вікні 🎬
  return (
    <Modal onClose={() => router.back()}>
      <div className={css.container}>
        <h2 className={css.title}>{note.title}</h2>
        <p className={css.tag}>{note.tag}</p>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          {new Date(note.createdAt).toLocaleDateString()}
        </p>
      </div>
    </Modal>
  );
}
