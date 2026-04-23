export interface YoutubeVideoItem {
  id: string;
  snippet: {
    title: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: {
      high?: {
        url: string;
      };
    };
  };
  statistics: {
    viewCount?: string;
    likeCount?: string;
    commentCount?: string;
  };
}

export interface YoutubeApiResponse {
  items: YoutubeVideoItem[];
}

export interface CleanVideoDto {
  thumbnail: string;
  title: string;
  author: string;
  publishedAtRelative: string;
  hypeLevel: number;
}