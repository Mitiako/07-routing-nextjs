"use client";

import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

// Перенесено з ДЗ-5 (адаптовано)
// В Next.js простий імпорт react-paginate працює без хаків — на відміну від Vite
// Описуємо що очікуємо від батьківського компонента
interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  // Перенесено з ДЗ-5
  // Бібліотека рахує сторінки з нуля — тому selected + 1 при виборі
  // і currentPage - 1 при відображенні активної сторінки
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }: { selected: number }) =>
        onPageChange(selected + 1)
      }
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}
