"use client";
import { useState } from "react";
import { PlaylistItem } from "@/src/types/playList";
import { Track } from "@/src/types/track";
import Loading from "@/src/app/_components/loading";
import { useQuery } from "@tanstack/react-query";



export function Playlist() {
    const [selectedPlaylistId, setSelectedPlaylistId] = useState<string>('');
    const {
        data: playList = [],
        isLoading: isLoadingPlayList,
        isError: isErrorPlayList,
        error: errorPlayList,
    } = useQuery<PlaylistItem[]>({
        queryKey: ["playlists"],
        queryFn: async () => {
            const res = await fetch("/api/spotify/play-list?limit=5");
            if (!res.ok) throw new Error(`Error al obtener play list, no pudimos cargar los datos. Reintentalo: ${res.statusText}`);
            return res.json();
        },
    });

    const {
        data: tracks = [],
        isLoading: isLoadingTracks,
        isError: isErrorTracks,
        error: errorTracks,
        refetch: refetchTracks,
    } = useQuery<Track[]>({
        queryKey: ["playlist-tracks", selectedPlaylistId],
        queryFn: async () => {
            if (!selectedPlaylistId) return [];
            const res = await fetch(`/api/spotify/play-list/${selectedPlaylistId}/tracks`);
            if (!res.ok) throw new Error(`Error al obtener las canciones: ${res.statusText}`);
            return res.json();
        },
        enabled: !!selectedPlaylistId, // solo corre si hay playlist seleccionada sin enabled ejecuta automáticamente el queryFn

    });

    if (isLoadingPlayList) return <Loading />;
    if (isErrorPlayList) return <p>{(errorPlayList as Error).message}</p>;

    return (
        <div>
            <h2>Mis Playlists</h2>
            <ul>
                {playList.map((pl) => (
                    <li key={pl.id}>
                        {pl.name}
                        <button
                            onClick={() => {
                                setSelectedPlaylistId(pl.id);
                                refetchTracks();
                            }}
                            className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
                        >
                            Ver tracks
                        </button>
                    </li>
                ))}
            </ul>


            {selectedPlaylistId && (
                <div>
                    {isLoadingTracks && <Loading />}
                    {isErrorTracks && <p>{(errorTracks as Error).message}</p>}
                    <ul>
                        {tracks.map((track) => (
                            <li key={track.id}>{track.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>


    );
}