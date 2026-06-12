import { fetchNoteById } from "../../../../lib/api";
import NotePreviewModal from "./NotePreview.client";

// Ця частина коду взята з конспекту — "Перехоплення маршрутів" (адаптовано)
// Цей маршрут перехоплює /notes/[id] і показує нотатку в модалці
// замість повного переходу на окрему сторінку
type Props = {
  params: Promise<{ id: string }>;
};

export default async function NotePreviewPage({ params }: Props) {
  const { id } = await params;

  // Отримуємо дані нотатки на сервері
  const note = await fetchNoteById(id);

  return <NotePreviewModal note={note} />;
}
