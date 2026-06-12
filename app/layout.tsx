import type { Metadata } from "next";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./globals.css";

// Ця частина коду взята з конспекту — "Як працює Layout"
export const metadata: Metadata = {
  title: "NoteHub",
  description: "A simple and efficient application for managing personal notes",
};

// Ця частина коду взята з конспекту — "Перехоплення маршрутів" (адаптовано)
// Додаємо modal до пропсів — Next.js автоматично передає @modal паралельний маршрут
export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          {children}
          {/* Ця частина коду взята з конспекту — "Перехоплення маршрутів" */}
          {/* modal рендериться поверх всього контенту коли є активний @modal маршрут */}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
