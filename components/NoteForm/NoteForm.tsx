"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import type { NoteTag } from "../../types/note";
import { createNote } from "../../lib/api";
import css from "./NoteForm.module.css";

// Перенесено з ДЗ-5
// Описуємо як виглядають дані форми всередині
interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

// Перенесено з ДЗ-5
// Форма потребує тільки функцію закриття — все інше вона робить сама
interface NoteFormProps {
  onClose: () => void;
}

// Перенесено з ДЗ-5
// Правила валідації — щоб користувач не міг відправити порожню нотатку або з надто довгим текстом, а також щоб тег був одним з дозволених, або щоб не забув його вибрати взагалі, або щоб не вибрав якийсь неіснуючий тег, або щоб не ввів якийсь дивний тег вручну — все це ми перевіряємо тут... Фух, це було довго писати.
const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be at most 50 characters")
    .required("Title is required"),
  content: Yup.string().max(500, "Content must be at most 500 characters"),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("Tag is required"),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  // Перенесено з ДЗ-5
  // Отримуємо доступ до клієнта запитів — щоб оновити список після створення
  const queryClient = useQueryClient();

  // Перенесено з ДЗ-5
  // Мутація для створення нотатки — живе тут бо форма за це відповідає
  const createMutation = useMutation({
    mutationFn: createNote,
    // Все вийшло — оновлюємо список і закриваємо форму
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note created successfully!");
      onClose();
    },
    // Щось пішло не так — повідомляємо користувача
    onError: () => {
      toast.error("Failed to create note. Please try again.");
    },
  });

  // Перенесено з ДЗ-5
  // Початкові значення форми — поля порожні, тег за замовчуванням Todo
  const initialValues: NoteFormValues = {
    title: "",
    content: "",
    tag: "Todo",
  };

  // Ось наша форма — красива, валідована і готова до роботи
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => createMutation.mutate(values)}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" type="text" name="title" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              as="textarea"
              id="content"
              name="content"
              rows={8}
              className={css.textarea}
            />
            <ErrorMessage
              name="content"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            {/* Кнопка скасування — закриває модалку без збереження */}
            <button
              type="button"
              className={css.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
            {/* Кнопка відправки — блокується поки іде запит щоб не створити дублікат */}
            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting || createMutation.isPending}
            >
              Create note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
