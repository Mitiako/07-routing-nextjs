import Link from "next/link";
import css from "./SidebarNotes.module.css";

// Перелік тегів описаний прямо в коді — бо бекенд не має маршруту для отримання тегів
// Взято з умови ДЗ-7
const TAGS = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function SidebarNotes() {
  // Ця частина коду взята з конспекту — "Паралельні маршрути" (адаптовано)
  // Сайдбар з посиланнями для фільтрації нотаток за тегами
  // Кожне посилання веде на /notes/filter/{tag} — catch-all маршрут
  return (
    <ul className={css.menuList}>
      {/* Посилання для перегляду всіх нотаток без фільтрації */}
      <li className={css.menuItem}>
        <Link href="/notes/filter/all" className={css.menuLink}>
          All notes
        </Link>
      </li>
      {/* Посилання для кожного тегу */}
      {TAGS.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
