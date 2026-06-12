import axios from 'axios';
import type { Note, NoteTag } from '../types/note';

// Базова URL адреса NoteHub API
const BASE_URL = 'https://notehub-public.goit.study/api';

// Ця частина коду взята з конспекту — "Початок роботи з API"
// В Next.js змінні оточення отримуємо через process.env а не import.meta.env як було у Vite
const getHeaders = () => ({
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
});

// Перенесено з ДЗ-6
interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

// Перенесено з ДЗ-6
interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

// Перенесено з ДЗ-6 (адаптовано)
// Додано параметр tag для фільтрації нотаток за тегом — нова функціональність ДЗ-7
// Якщо tag не передати — сервер поверне всі нотатки без фільтрації
export async function fetchNotes(
  page: number = 1,
  search: string = '',
  tag?: string
): Promise<FetchNotesResponse> {
  const response = await axios.get<FetchNotesResponse>(
    `${BASE_URL}/notes`,
    {
      params: {
        page,
        perPage: 12,
        ...(search && { search }),
        // Передаємо тег тільки якщо він є — бекенд не очікує тег "all"
        ...(tag && tag !== 'all' && { tag }),
      },
      headers: getHeaders(),
    }
  );
  return response.data;
}

// Перенесено з ДЗ-6
// Отримуємо одну нотатку за її id — для сторінки деталей
export async function fetchNoteById(id: string): Promise<Note> {
  const response = await axios.get<Note>(
    `${BASE_URL}/notes/${id}`,
    { headers: getHeaders() }
  );
  return response.data;
}

// Перенесено з ДЗ-6
// Створюємо нову нотатку на сервері
export async function createNote(data: CreateNoteData): Promise<Note> {
  const response = await axios.post<Note>(
    `${BASE_URL}/notes`,
    data,
    { headers: getHeaders() }
  );
  return response.data;
}

// Перенесено з ДЗ-6
// Видаляємо нотатку за її id
export async function deleteNote(id: string): Promise<Note> {
  const response = await axios.delete<Note>(
    `${BASE_URL}/notes/${id}`,
    { headers: getHeaders() }
  );
  return response.data;
}