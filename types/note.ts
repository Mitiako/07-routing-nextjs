// Перенесено з ДЗ-5
// Перелік допустимих тегів для нотатки
export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';

// Перенесено з ДЗ-5
// Інтерфейс який описує структуру однієї нотатки
export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}