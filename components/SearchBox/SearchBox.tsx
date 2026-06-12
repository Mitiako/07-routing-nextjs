"use client";

import css from "./SearchBox.module.css";

// Перенесено з ДЗ-5
// Описуємо що очікуємо від батьківського компонента
interface SearchBoxProps {
  value: string;
  onSearch: (query: string) => void;
}

export default function SearchBox({ value, onSearch }: SearchBoxProps) {
  // Перенесено з ДЗ-5
  // Просте поле пошуку — при кожній зміні передає значення вгору в NotesClient
  // Там воно потрапляє в debounce і тільки потім іде запит до сервера
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        onSearch(e.target.value)
      }
    />
  );
}
