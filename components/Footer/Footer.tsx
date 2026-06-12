import css from "./Footer.module.css";

export default function Footer() {
  // Розмітка взята з умови ДЗ-6
  // Футер з контактною інформацією розробника
  // Щороку 1 січня рік оновиться автоматично без жодних змін в коді
  // Але як саме оновлюється рік, я прсто ХЗ ))
  // Жартую ) Це серверний компонент — тому рік береться з сервера в момент рендеру сторінки

  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Dmytro Kovalenko</p>
          <p>
            Contact us:{" "}
            <a href="mailto:d.kovalenko.fs@gmail.com">
              d.kovalenko.fs@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
