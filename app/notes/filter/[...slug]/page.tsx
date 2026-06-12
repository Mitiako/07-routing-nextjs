import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "../../../../lib/api";
import NotesClient from "./Notes.client";

// Ця частина коду взята з конспекту — "Універсальні маршрути" (адаптовано)
// catch-all маршрут — обробляє /notes/filter/all, /notes/filter/Work тощо
type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotesByTagPage({ params }: Props) {
  // Ця частина коду взята з конспекту — "Універсальні маршрути"
  // slug це масив — беремо перший елемент як тег
  const { slug } = await params;
  const tag = slug[0] === "all" ? undefined : slug[0];

  // Ця частина коду взята з конспекту — "Завантаження даних у клієнтському компоненті"
  // Prefetch нотаток на сервері з урахуванням тегу
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag],
    queryFn: () => fetchNotes(1, "", tag),
  });

  // Передаємо закешовані дані клієнту разом з поточним тегом
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
