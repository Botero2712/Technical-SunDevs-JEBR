const API_URL = 'http://localhost:3000/api/videos';

export async function fetchVideos() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('No fue posible cargar los videos.');
  }

  return response.json();
}