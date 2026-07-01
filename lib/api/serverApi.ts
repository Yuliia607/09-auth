import { cookies } from 'next/headers';

import { api } from './api';


import type { User } from '@/types/user';
export const fetchNotes = async ({
  page,
  search,
  tag,
}: {
  page: number;
  search: string;
  tag?: string;
}) => {
  const cookieStore =
    await cookies();

  const cookie =
    cookieStore.toString();

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
    await api.get('/notes', {
      params,
      headers: {
        Cookie: cookie,
      },
    });

  return data;
};
export const fetchNoteById = async (
  id: string
) => {
  const cookieStore =
    await cookies();

  const cookie =
    cookieStore.toString();

  const { data } =
    await api.get(
      `/notes/${id}`,
      {
        headers: {
          Cookie: cookie,
        },
      }
    );

  return data;
};
export const getMe = async () => {
  const cookieStore =
    await cookies();

  const cookie =
    cookieStore.toString();

  const { data } =
    await api.get<User>(
      '/users/me',
      {
        headers: {
          Cookie: cookie,
        },
      }
    );

  return data;
};
export const checkSession =
  async () => {
    const cookieStore =
      await cookies();

    const cookie =
      cookieStore.toString();

    const { data } =
      await api.get<User | null>(
        '/auth/session',
        {
          headers: {
            Cookie: cookie,
          },
        }
      );

    return data;
  };