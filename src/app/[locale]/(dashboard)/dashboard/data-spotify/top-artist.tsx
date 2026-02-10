"use client";
import { CardArtist } from "@/src/app/_components/cardArtist"
import { useTopArtists } from "@/src/hooks/useTopArtists";
import  Loading  from "@/src/app/_components/loading";
import { Artist } from "@/src/types/spotify";


type TypeTimeRange = {
  timeRange: string;
}
export function TopArtist(timeRange: TypeTimeRange) {
  const { data: artists, isLoading, isError, error } = useTopArtists(timeRange);

  if (isLoading) return <Loading />;
  if (isError) return <p>{(error as Error).message}</p>;
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-6">Tus artistas recientemente escuchados</h1>
        <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-4xl">
          {artists?.map((artist: Artist) => (
            <CardArtist key={artist.id} artist={artist} />
          ))}
        </div>
      </div>

    </>
  );

}
