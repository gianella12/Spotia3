"use client";
import { CardArtist } from "@/src/app/_components/cardArtist"
import { useTopArtists } from "@/src/hooks/useTopArtists";

export function TopArtist() {
  const { artists, loading, error } = useTopArtists();

  if (loading) return <p>Cargando artistas...</p>;
  if (error) return <p>{error}</p>;
  return (
    <>
      {artists.map((artist) => (
        <CardArtist key={artist.id} artist={artist} />
      ))}
    </>
  );
}
