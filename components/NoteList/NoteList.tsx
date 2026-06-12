"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import toast from "react-hot-toast";
import type { Note } from "../../types/note";
import { deleteNote } from "../../lib/api";
import css from "./NoteList.module.css";

// Перенесено з ДЗ-5 (адаптовано)
// Список нотаток сам знає як видаляти — тільки нотатки потрібні
interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  // Перенесено з ДЗ-5
  // Отримуємо доступ до клієнта запитів — щоб оновити список після видалення
  const queryClient = useQueryClient();

  // Перенесено з ДЗ-5
  // Мутація для видалення нотатки — живе тут бо список за це відповідає
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    // Все вийшло — оновлюємо список нотаток і повідомляємо користувача
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note deleted successfully!");
    },
    // Щось пішло не так — повідомляємо користувача
    onError: () => {
      toast.error("Failed to delete note. Please try again.");
    },
  });

  // Показуємо всі нотатки у вигляді списку
  // Link від Next.js замість <a> — для плавної навігації на сторінку деталей
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          {/* Заголовок нотатки */}
          <h2 className={css.title}>{note.title}</h2>
          {/* Вміст нотатки */}
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            {/* Тег нотатки */}
            <span className={css.tag}>{note.tag}</span>
            {/* Ця частина коду взята з умови ДЗ-6 — посилання View details */}
            {/* Link від Next.js — переходить на сторінку деталей без перезавантаження */}
            <Link href={`/notes/${note.id}`} className={css.link}>
              View details
            </Link>
            {/* Кнопка видалення — блокується поки іде запит щоб не натиснути двічі */}
            <button
              className={css.button}
              onClick={() => deleteMutation.mutate(note.id)}
              disabled={deleteMutation.isPending}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
