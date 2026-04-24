export default function CrownJewelCard({ video }) {
  return (
    <article className="crown-jewel-card">
      <div className="crown-jewel-badge">Joya de la Corona</div>
      <img
        className="crown-jewel-image"
        src={video.thumbnail}
        alt={`Miniatura de ${video.title}`}
      />

      <div className="crown-jewel-content">
        <p className="video-author">{video.author}</p>
        <h2>{video.title}</h2>
        <p className="video-date">{video.publishedAtRelative}</p>
        <div className="hype-pill">Hype: {video.hypeLevel}</div>
      </div>
    </article>
  );
}