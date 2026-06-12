"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { fetchNoteById } from "../../../lib/api";
import css from "./NoteDetails.module.css";

export default function NoteDetailsClient() {
  // Ця частина коду взята з конспекту — "Завантаження даних у клієнтському компоненті"
  // useParams — отримуємо id з URL
  const { id } = useParams<{ id: string }>();

  // Ця частина коду взята з конспекту — "Програмна навігація"
  // useRouter — для кнопки Back
  const router = useRouter();

  // Ця частина коду взята з конспекту — "Завантаження даних у клієнтському компоненті"
  // refetchOnMount: false — дані вже є з prefetchQuery
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !note) return <p>Something went wrong.</p>;

  // Показуємо деталі нотатки
  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.tag}>{note.tag}</p>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          {new Date(note.createdAt).toLocaleDateString()}
        </p>
        {/* Ця частина коду взята з конспекту — "Програмна навігація" */}
        {/* Кнопка Back — повертає на попередню сторінку */}
        <button onClick={() => router.back()}>← Back</button>
      </div>
    </div>
  );
}
