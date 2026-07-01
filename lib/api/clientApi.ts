import { api } from './api';

import type {
  Note,
  NoteTag,
} from '@/types/note';

import type { User } from '@/types/user';
interface FetchNotesParams {
  page: number;
  search: string;
  tag?: string;
}
export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}
export const fetchNotes = async ({
  page,
  search,
  tag,
}: FetchNotesParams) => {
  const params: Record<
    string,
    string | number
  > = {
    page,
    perPage: 12,
  };

  if (search) {
    params.search = search;
  }

  if (tag) {
    params.tag = tag;
  }

  const { data } =
    await api.get<NotesResponse>(
      '/notes',
      {
        params,
      }
    );

  return data;
};
export const fetchNoteById = async (
  id: string
) => {
  const { data } =
    await api.get<Note>(
      `/notes/${id}`
    );

  return data;
};
interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}
export const createNote = async (
  note: CreateNoteData
) => {
  const { data } =
    await api.post<Note>(
      '/notes',
      note
    );

  return data;
};
export const deleteNote = async (
  id: string
) => {
  const { data } =
    await api.delete<Note>(
      `/notes/${id}`
    );

  return data;
};
export const register = async (
  body: {
    email: string;
    password: string;
  }
) => {
  const { data } =
    await api.post(
      '/auth/register',
      body
    );

  return data;
};

export const login = async (
  body: {
    email: string;
    password: string;
  }
) => {
  const { data } =
    await api.post(
      '/auth/login',
      body
    );

  return data;
};

export const logout = async () => {
  await api.post('/auth/logout');
};

export const checkSession =
  async () => {
    const { data } =
      await api.get(
        '/auth/session'
      );

    return data;
  };

export const getMe = async () => {
  const { data } =
    await api.get('/users/me');

  return data;
};

export const updateMe = async (
  body: Partial<User>
) => {
  const { data } =
    await api.patch(
      '/users/me',
      body
    );

  return data;
};