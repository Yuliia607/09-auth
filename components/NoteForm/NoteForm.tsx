'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { createNote } from '@/lib/api';
import { useNoteStore } from '@/lib/store/noteStore';

import type { NoteTag } from '@/types/note';

import css from './NoteForm.module.css';

const NoteForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    draft,
    setDraft,
    clearDraft,
  } = useNoteStore();

  const mutation = useMutation({
    mutationFn: createNote,
  });

  const handleSubmit = async (
    formData: FormData
  ) => {
    const title =
      formData.get('title') as string;

    const content =
      formData.get('content') as string;

    const tag =
      formData.get('tag') as NoteTag;

    await mutation.mutateAsync({
      title,
      content,
      tag,
    });

    clearDraft();

    queryClient.invalidateQueries({
      queryKey: ['notes'],
    });

    router.push('/notes/filter/all');
  };

  return (
    <form
      action={handleSubmit}
      className={css.form}
    >
      <div className={css.formGroup}>
        <label htmlFor="title">
          Title
        </label>

        <input
          id="title"
          name="title"
          type="text"
          className={css.input}
          defaultValue={draft.title}
          onChange={(e) =>
            setDraft({
              title:
                e.currentTarget.value,
            })
          }
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">
          Content
        </label>

        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          defaultValue={draft.content}
          onChange={(e) =>
            setDraft({
              content:
                e.currentTarget.value,
            })
          }
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">
          Tag
        </label>

        <select
          id="tag"
          name="tag"
          className={css.select}
          defaultValue={draft.tag}
          onChange={(e) =>
            setDraft({
              tag:
                e.currentTarget
                  .value as NoteTag,
            })
          }
        >
          <option value="Todo">
            Todo
          </option>

          <option value="Work">
            Work
          </option>

          <option value="Personal">
            Personal
          </option>

          <option value="Meeting">
            Meeting
          </option>

          <option value="Shopping">
            Shopping
          </option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
        >
          Cancel
        </button>

        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          Create note
        </button>
      </div>
    </form>
  );
};

export default NoteForm;