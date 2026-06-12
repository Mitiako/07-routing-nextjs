// Ця частина коду взята з конспекту — "Обробка неіснуючих маршрутів"
// Глобальна сторінка 404 — відображається коли користувач потрапляє на неіснуючий маршрут
// Розмітка взята з умови ДЗ-7
export default function NotFound() {
  return (
    <div>
      <h1>404 - Page not found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}
