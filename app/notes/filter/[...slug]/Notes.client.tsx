'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  useQuery,
  keepPreviousData,
} from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';

import css from '@/components/NotesPage/NotesPage.module.css';

import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';

import { fetchNotes } from '@/lib/api';

interface NotesClientProps {
  tag?: string;
}

const NotesClient = ({
  tag,
}: NotesClientProps) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const handlePageChange = ({
    selected,
  }: {
    selected: number;
  }) => {
    setPage(selected + 1);
  };

  const handleSearch = useDebouncedCallback(
    (value: string) => {
      setSearch(value);
      setPage(1);
    },
    500
  );

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', page, search, tag],
    queryFn: () =>
      fetchNotes({
        page,
        search,
        tag,
      }),
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong...</p>;
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />

        {data && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        )}

        <Link
          href="/notes/action/create"
          className={css.button}
        >
          Create note +
        </Link>
      </header>

      {data && data.notes.length > 0 && (
        <NoteList notes={data.notes} />
      )}
    </div>
  );
};

export default NotesClient;