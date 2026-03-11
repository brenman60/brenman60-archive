import { useState, useEffect } from "react";

import RowText from '../../components/articleComponents/RowText';
import RowTextImage from '../../components/articleComponents/RowTextImage';
import RowTextImages from '../../components/articleComponents/RowTextImages';
import RowImages from '../../components/articleComponents/RowImages';
import RowSeparator from "../../components/articleComponents/RowSeparator";
import RowSong from "../../components/articleComponents/RowSong";

export default function Article() {
  const [headerImageIndex, setHeaderImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeaderImageIndex((headerImageIndex) => (headerImageIndex + 1) % headerImages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);
  
  const headerImages = [
    
  ];

  const [orderMode, setOrderMode] = useState("ranking");

  const songs = [
    { order: 1, ranking: 1, songName: "Holy Wars ... The Punishment Due", spotifyUrl: "https://open.spotify.com/embed/track/0bM9c5A7CterSOEssmWqAa?utm_source=generator&theme=0", favorite: false },
    { order: 2, ranking: 1, songName: "Hangar 18", spotifyUrl: "https://open.spotify.com/embed/track/0KAaslGdPc5I6WxmKe3whe?utm_source=generator&theme=0", favorite: false },
    { order: 3, ranking: 1, songName: "Take No Prisoners", spotifyUrl: "https://open.spotify.com/embed/track/0xa5WQdm7mnY9dviqejc2z?utm_source=generator&theme=0", favorite: false },
    { order: 4, ranking: 1, songName: "Five Magics", spotifyUrl: "https://open.spotify.com/embed/track/1aSGE7H6pkelrCmdzMquEg?utm_source=generator&theme=0", favorite: false },
    { order: 5, ranking: 1, songName: "Poison Was The Cure", spotifyUrl: "https://open.spotify.com/embed/track/5ONVnHYT7srwxU9UDsJH2k?utm_source=generator&theme=0", favorite: false },
    { order: 6, ranking: 1, songName: "Lucretia", spotifyUrl: "https://open.spotify.com/embed/track/1n538MfKDtkS4GTAaWN25H?utm_source=generator&theme=0", favorite: false },
    { order: 7, ranking: 1, songName: "Tornado Of Souls", spotifyUrl: "https://open.spotify.com/embed/track/4GMQOjbWshf4Mzphkjg0DJ?utm_source=generator&theme=0", favorite: false },
    { order: 8, ranking: 1, songName: "Dawn Patrol", spotifyUrl: "https://open.spotify.com/embed/track/4b2GAM5mE3K0btATdsi0UO?utm_source=generator&theme=0", favorite: false },
    { order: 9, ranking: 1, songName: "Rust In Peace...Polaris", spotifyUrl: "https://open.spotify.com/embed/track/1A9bOtUg91RLO9nGzXF8ao?utm_source=generator&theme=0", favorite: false },
  ];

  return (
    <>
      {headerImages.length > 0 && <div id="header-images">
        {headerImages.map((image) => (
          <img key={image} className={headerImageIndex == headerImages.indexOf(image) ? "active" : ""} src={image.src} alt={image.alt} />
        ))}
      </div>}
      <h1 id="title">Megadeth - Rust In Peace</h1>
      <main>
        <button className="orderButton" onClick={() => setOrderMode(orderMode === "ranking" ? "order" : "ranking")}>
          {orderMode === "ranking" ? "Ordered by Ranking" : "Ordered by Track Order"}
        </button>
        {songs
        .sort((a, b) => orderMode === "ranking" ? a.ranking - b.ranking : a.order - b.order)
        .map((song) => (
          <RowSong key={song.order} ranking={song.ranking} songName={song.songName} spotifyUrl={song.spotifyUrl} favorite={song.favorite} />
        ))}
      </main>
    </>
  );
}
