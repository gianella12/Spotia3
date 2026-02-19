import { Artist } from "@/src/types/spotify";

export function buildAIPrompt(artists: Artist[]) {
     const descripcionArtistas = artists.map(
    (artist) =>
      `-${artist.name} | Generos: ${artist.genres.join(",")} | Popularidad: ${artist.popularity}`
  ).join("\n")

  return `
Sos un experto en música con un sentido del humor increíble.

El usuario escucha estos artistas:
${descripcionArtistas}

Con base en eso, escribí UNA SOLA descripción de su perfil musical en español.

Reglas:
- Máximo 4 oraciones
- Tono divertido y gracioso, como si fuera una bio de Instagram
- Mencioná alguno de sus géneros o artistas favoritos
- Que suene como si conocieras al usuario de toda la vida
- No uses emojis
- IMPORTANTE: no uses asteriscos (*), no uses negritas, no uses ningún símbolo de formato. Solo texto plano.
- Respondé directamente con la descripción, sin títulos ni opciones
-no hagas enfasis en ninguna palabra 
`;
}