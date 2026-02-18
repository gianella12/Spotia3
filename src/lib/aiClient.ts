
import OpenAI from "openai";
import { AI_PROVIDER, API_KEYS } from "../config/iaConfig";
import { Artist } from "../types/spotify";

//elige un provedor 
export async function askAI({ artists }: { artists: Artist[] }) {
  switch (AI_PROVIDER) {
    case "gemini":
      return callGemini(artists);
    case "claude":
      return callClaude(artists);
    case "gpt":
      return callGPT(artists);
    default:
      throw new Error("Proveedor de IA no soportado");
  }
}
//Gpt
async function callGPT(artistas: Artist[]) {

  const client = new OpenAI({
    apiKey: API_KEYS.gpt,
  });
  const descripcionArtistas = artistas.map(
    (artist) =>
      `-${artist.name} | Generos: ${artist.genres.join(",")} | Popularidad: ${artist.popularity}`
  ).join("\n")

  const prompt = `
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

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  })

  return response.choices[0].message?.content ?? "";
}
// Gemini
async function callGemini(artistas: Artist[]) {
  const descripcionArtistas = artistas.map(
    (artist) =>
      `-${artist.name} | Generos: ${artist.genres.join(",")} | Popularidad: ${artist.popularity}`
  ).join("\n")


  const prompt = `
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
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEYS.gemini}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    },
  );

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

}


// Claude
async function callClaude(artistas: Artist[]) {
  const descripcionArtistas = artistas.map(
    (artist) =>
      `-${artist.name} | Generos: ${artist.genres.join(",")} | Popularidad: ${artist.popularity}`
  ).join("\n")


  const prompt = `
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
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEYS.claude}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-3-opus-20240229",
      messages: [
        {
          role: "user",
          content: prompt
        },
      ],
    }),
  });
  const data = await res.json();
  return data.content[0].text;
}
