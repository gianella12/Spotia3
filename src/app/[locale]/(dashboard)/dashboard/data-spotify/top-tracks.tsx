"use client";

import { TrackCard } from "@/src/app/_components/trackCard";
import { Track } from "@/src/types/track";
import Loading from "@/src/app/_components/loading";
import { useQuery } from "@tanstack/react-query";




type TypeTimeRange = {
    timeRange: string;
}
export function TopTracks({ timeRange }: TypeTimeRange) {
    const { data: tracksList, isLoading, isError, error, refetch } = useQuery<Track[]>({
        queryKey: ["top-tracks", timeRange],
        queryFn: async () => {
            const res = await fetch(`/api/spotify/top-tracks?limit=5&time_range=${timeRange}`);
            if (!res.ok) throw new Error(`No pudimos cargar tus datos. Intentá de nuevo: ${res.statusText}`);
            const data = await res.json();
            return data.items as Track[];
        }
    });

    if (isLoading) return <Loading />;
    if (isError) return (
        <div>
            <p>{(error as Error).message}</p>
            <button
                onClick={() => refetch()}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
                Reintentar
            </button>
        </div>

    );

    return (
        <div className="max-w-3xl mx-auto flex flex-col gap-1">
            <h2 className="text-2xl font-bold mb-2 mt-4 flex justify-center items-center">Canciones que más te representan en este período</h2>
            {tracksList?.map((track: Track) => (
                <TrackCard key={track.id} track={track} />
            ))}
        </div>

    );
}