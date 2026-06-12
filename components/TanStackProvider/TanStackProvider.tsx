"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

// Описуємо що очікуємо від батьківського компонента
interface TanStackProviderProps {
  children: React.ReactNode;
}

export default function TanStackProvider({ children }: TanStackProviderProps) {
  // Ця частина коду взята з конспекту — "Завантаження даних у клієнтському компоненті" (точний copy-paste)
  // QueryClient створюємо всередині useState а не поза компонентом!
  // Якщо створити поза компонентом — один екземпляр буде спільним для ВСІХ користувачів сервера
  // Це означає що дані одного користувача могли б потрапити до іншого — серйозна проблема безпеки
  const [queryClient] = useState(() => new QueryClient());

  // Ця частина коду взята з конспекту — "Завантаження даних у клієнтському компоненті" (точний copy-paste)
  // QueryClientProvider огортає все дерево компонентів — щоб useQuery і useMutation працювали скрізь
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
