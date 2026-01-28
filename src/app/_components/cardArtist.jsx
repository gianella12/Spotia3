export function CardArtist({ artist }) {
    return (
        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
            <div
                key={artist.id}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
            >
                <h3 className="text-lg font-semibold">{artist.name}</h3>
                <p className="text-sm text-gray-600">
                    {artist.genres.join(", ")}
                </p>
                <a
                    href={artist.external_urls.spotify}
                    target="_blank"
                    className="text-blue-500 mt-2"
                >
                    Ver en Spotify
                </a>
            </div>
        </div>
    )
}