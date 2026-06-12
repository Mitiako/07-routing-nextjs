"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { Toaster } from "react-hot-toast";
import { fetchNotes } from "../../../../lib/api";
import NoteList from "../../../../components/NoteList/NoteList";
import Modal from "../../../../components/Modal/Modal";
import NoteForm from "../../../../components/NoteForm/NoteForm";
import SearchBox from "../../../../components/SearchBox/SearchBox";
import Pagination from "../../../../components/Pagination/Pagination";
import css from "./NotesPage.module.css";

// Перенесено з ДЗ-6 (06-notehub-nextjs/app/notes/Notes.client.tsx) (адаптовано)
// Додано пропс tag для фільтрації нотаток за тегом — нова функціональність ДЗ-7
interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  // Перенесено з ДЗ-6
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Перенесено з ДЗ-6
  // Відкладений колбек — чекаємо 500мс після останнього введення
  const handleDebouncedSearch = useDebouncedCallback((value: string) => {
    setDebouncedSearch(value);
    setPage(1);
  }, 500);

  // Перенесено з ДЗ-6 (адаптовано)
  // Додано tag до queryKey — щоб кеш оновлювався при зміні тегу
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, debouncedSearch, tag],
    queryFn: () => fetchNotes(page, debouncedSearch, tag),
    placeholderData: (previousData) => previousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  function handleSearch(value: string) {
    setSearchQuery(value);
    handleDebouncedSearch(value);
  }

  // Збираємо сторінку нотаток разом 🎬
  return (
    <main className={css.container}>
      <Toaster position="top-right" />
      <div className={css.toolbar}>
        <SearchBox onSearch={handleSearch} value={searchQuery} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </div>
      {isLoading && <p>Loading notes, please wait...</p>}
      {isError && <p>Something went wrong. Please try again.</p>}
      {notes.length > 0 && <NoteList notes={notes} />}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </main>
  );
}
