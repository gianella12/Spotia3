export const topGenres = (artists: { genres: string[] }[]) => {

  const genreCount = artists.reduce(
    (acc: Record<string, number>, artist: { genres: string[] }) => {
      artist.genres.forEach((genre: string) => {
        acc[genre] = (acc[genre] || 0) + 1;
      });
      return acc;
    },
    {}, 
  );

  const sortedGeneres = Object.entries(genreCount)
  .sort(([,a], [, b]) => b - a)
  .slice(0, 5);

  const totalTop5= sortedGeneres.reduce((sum, [, count]) => sum + count,0);

  const genreData = sortedGeneres.map(([genre, count]) => ({
    genre,
    count,
    percentage: parseFloat(((count / totalTop5) * 100).toFixed(1)),
  }))
  return genreData;
};
