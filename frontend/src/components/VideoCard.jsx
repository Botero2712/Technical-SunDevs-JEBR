export default function VideoCard({ video }) {
  return (
    <article className="video-card">
      <img className="video-image" src={video.thumbnail} alt={`Miniatura de ${video.title}`} />

      <div className="video-content">
        <p className="video-author">{video.author}</p>
        <h3>{video.title}</h3>
        <p className="video-date">{video.publishedAtRelative}</p>
        <div className="hype-pill">Hype: {video.hypeLevel}</div>
      </div>
    </article>
  );
}