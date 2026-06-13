import css from "./LayoutNotes.module.css";

// Ця частина коду взята з конспекту — "Паралельні маршрути"
// Layout для секції /notes/filter — сайдбар зліва, контент справа
type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

export default function NotesFilterLayout({ children, sidebar }: Props) {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
}
