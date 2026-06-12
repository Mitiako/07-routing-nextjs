// Бляха... я знову забув уважно проучитати ТЗ...
// Вже навіть не смішно, просто соромно... Ну що ж, виправляюся і додаю серверний компонент для завантаження даних нотатки за її id

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNoteById } from "../../../lib/api";
import NoteDetailsClient from "./NoteDetails.client";

// Ця частина коду взята з конспекту — "Завантаження даних у клієнтському компоненті"
// Серверний компонент — завантажує деталі нотатки заздалегідь
type Props = {
  params: Promise<{ id: string }>;
};

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
