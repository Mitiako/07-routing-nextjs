import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNoteById } from "../../../../lib/api";
import NotePreviewClient from "./NotePreview.client";

// Ця частина коду взята з конспекту — "Перехоплення маршрутів" (адаптовано)
// Серверний компонент — prefetch даних нотатки для клієнтського компонента
type Props = {
  params: Promise<{ id: string }>;
};

export default async function NotePreviewPage({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  // Завантажуємо дані нотатки заздалегідь і зберігаємо у кеш
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  // Передаємо закешовані дані клієнту через HydrationBoundary
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient />
    </HydrationBoundary>
  );
}
