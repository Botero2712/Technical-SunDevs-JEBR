import { useEffect, useMemo, useState } from 'react';
import CrownJewelCard from './components/CrownJewelCard';
import VideoCard from './components/VideoCard';
import { fetchVideos } from './api/videos';

export default function App() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadVideos() {
      try {
        setLoading(true);
        setError('');

        const data = await fetchVideos();
        setVideos(data);
      } catch (err) {
        setError(err.message || 'Ocurrió un error inesperado.');
      } finally {
        setLoading(false);
      }
    }

    loadVideos();
  }, []);

  const crownJewel = useMemo(() => {
    if (!videos.length) return null;

    return videos.reduce((highest, current) => {
      return current.hypeLevel > highest.hypeLevel ? current : highest;
    }, videos[0]);
  }, [videos]);

  const regularVideos = useMemo(() => {
    if (!crownJewel) return [];

    return videos.filter((video) => video !== crownJewel);
  }, [videos, crownJewel]);

  if (loading) {
    return (
      <main className="page-state">
        <p>Cargando videos...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page-state">
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main className="page-container">
      <header className="page-header">
        <p className="eyebrow">Sundevs Challenge</p>
        <h1>Cartelera de Hype Tecnológico</h1>
        <p className="page-description">
          Una vista limpia del feed, filtrada por nuestro backend.
        </p>
      </header>

      {crownJewel && <CrownJewelCard video={crownJewel} />}

      <section className="videos-section">
        <h2>Videos disponibles</h2>

        <div className="videos-grid">
          {regularVideos.map((video, index) => (
            <VideoCard
              key={`${video.title}-${video.author}-${index}`}
              video={video}
            />
          ))}
        </div>
      </section>
    </main>
  );
}