import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { getPlaylistTracks } from "@/src/lib/spotify/play-list/tracks/route";

// type Params = {
//     params: { id: string };
// };

export async function GET(
  _req: Request,
   context: { params: { id: string } }
) {
    try {
        //  console.log(req.url , 'esto es la url ')
        const session = await getServerSession(authOptions);
        const { id } = await context.params;
        
        if (!session || !session.accessToken) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }
        console.log(context ,'esto es el context ')
        console.log("Playlist ID:",id);
        const data = await getPlaylistTracks(session.accessToken, id);

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error playlist tracks:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
