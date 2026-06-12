// Просто заглушка для відображення помилки, якщо не вдається отримати деталі нотатки.

"use client";

export default function NoteDetailsError({ error }: { error: Error }) {
  return <p>Could not fetch note details. {error.message}</p>;
}
