const RowSong = ({
    className = "",
    ranking,
    songName,
    spotifyUrl,
    favorite = false,
}) => {
  return (
    <section className={"row rowSong " + className}>
      <h1 className={favorite ? "favorite" : ""}>{ranking}</h1>
      {spotifyUrl && (
        <iframe
          src={spotifyUrl}
          width="100%"
          height="152"
          frameBorder="0"
          allowFullScreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      )}
    </section>
  )
};

export default RowSong;
