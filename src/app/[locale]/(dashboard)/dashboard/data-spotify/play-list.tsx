"use client";
import { useState, useEffect } from "react";
import { PlaylistItem } from "@/src/types/playList";


export function Playlist() {
    const [playList, setPlayList] = useState<PlaylistItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPlayList() {
            try {
                const res = await fetch("/api/spotify/play-list?limit=5");
                if (!res.ok) throw new Error(`Error fetching play list: ${res.statusText}`);
                const data = await res.json();
                console.log("Play List Data:", data);
                setPlayList(data);
            } catch (err) {
                setError(`No se pudieron cargar las canciones: ${err}`);
            } finally {
                setLoading(false);
            }
        }
        fetchPlayList();
    }, []);
    console.log(playList);
    if (loading) return <p>Cargando playlist...</p>;
    if (error) return <p>{error}</p>;
    return (
        <div>
            <h2>Mis Playlists</h2>
            <ul>
                {playList.map((playlist) => (
                    <li key={playlist.id}>
                        {playlist.name}
                        <button 
                        onClick={() => fetch(`/api/spotify/play-list/${playlist.id}/tracks`)}
                        className="border-r-green-400 border m-3">
                            Ver canciones
                        </button>
                    </li>
                ))}
            </ul>
        </div>


    );
}