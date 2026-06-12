import css from "./LayoutNotes.module.css";

// Ця частина коду взята з конспекту — "Паралельні маршрути"
// Layout для секції /notes/filter — містить сайдбар і основний контент
// sidebar — це паралельний маршрут @sidebar який Next.js передає автоматично
type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

export default function NotesFilterLayout({ children, sidebar }: Props) {
  // Розміщуємо сайдбар зліва і контент справа — класична двоколонкова розмітка
  return (
    <section className={css.layout}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.content}>{children}</div>
    </section>
  );
}
