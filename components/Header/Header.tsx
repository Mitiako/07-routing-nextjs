import Link from "next/link";
import css from "./Header.module.css";

export default function Header() {
  // Ця частина коду взята з конспекту — "Знайомство з навігацією" (адаптовано)
  // В ДЗ-7 посилання на Notes веде на /notes/filter/all — щоб показати всі нотатки
  // Це уникає конфлікту між id нотатки та назвою тегу в URL
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/notes/filter/all">Notes</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
