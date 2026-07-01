import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import type { Metadata } from 'next';
export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string[];
  }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const tag =
    slug[0] === 'all'
      ? 'All notes'
      : `${slug[0]} notes`;

  return {
    title: tag,
    description: `Browse ${tag} in NoteHub.`,

    openGraph: {
      title: tag,
      description: `Browse ${tag} in NoteHub.`,
      url: `https://notehub.com/notes/filter/${slug[0]}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub application',
        },
      ],
    },
  };
}
interface NotesPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function NotesPage({
  params,
}: NotesPageProps) {
  const { slug } = await params;

  const currentTag =
    slug[0] === 'all'
      ? undefined
      : slug[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', currentTag],
    queryFn: () =>
      fetchNotes({
        page: 1,
        search: '',
        tag: currentTag,
      }),
  });

  return (
    <HydrationBoundary
      state={dehydrate(queryClient)}
    >
      <NotesClient tag={currentTag} />
    </HydrationBoundary>
  );
}