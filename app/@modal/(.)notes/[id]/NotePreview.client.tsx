"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { fetchNoteById } from "../../../../lib/api";
import Modal from "../../../../components/Modal/Modal";
import css from "./NotePreview.module.css";

export default function NotePreviewClient() {
  // Ця частина коду взята з конспекту — "Перехоплення маршрутів" (адаптовано)
  // Отримуємо id з URL через useParams
  const { id } = useParams<{ id: string }>();

  // Закриваємо модалку через router.back() — повертаємось на попередню сторінку
  const router = useRouter();

  // Отримуємо дані нотатки з кешу — дані вже є з prefetchQuery на сервері
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  // Показуємо лоадер поки завантажуються дані
  if (isLoading) return <p>Loading, please wait...</p>;

  // Якщо помилка або нотатку не знайдено
  if (isError || !note) return <p>Something went wrong.</p>;

  // Показуємо деталі нотатки в модальному вікні
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
