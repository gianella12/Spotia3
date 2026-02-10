"use client";

import ButtonPruebaIA from "@/src/app/_components/buttonPruebaIA";
import { useSession } from "next-auth/react";
import { TopArtist } from "./data-spotify/top-artist";
import TopGenere from "@/src/app/_components/TopGenere";
import { TopTracks } from "./data-spotify/top-tracks";
import { Playlist } from "./data-spotify/play-list";
import { Loading } from "@/src/app/_components/loading";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") return  <Loading />
  if (!session) return <p>No estás logueada</p>;
 
  return (
    <div>
      <div className="flex flex-col items-end">
        <h1>Bienvenida {session.user?.name}</h1>
        <p> {session.user?.email}</p>
      </div>
      <Playlist />

      <TopGenere />
      <TopArtist />
      <TopTracks />
      <div>
        <h1>resouesta ia</h1>
        <h4></h4>
        <ButtonPruebaIA />
      </div>
    </div>
  );
}
