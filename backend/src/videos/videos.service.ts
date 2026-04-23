import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  CleanVideoDto,
  YoutubeApiResponse,
  YoutubeVideoItem,
} from './videos.types';

@Injectable()
export class VideosService {
  private readonly dataPath = join(
    process.cwd(),
    'data',
    'mock-youtube-api.json',
  );

  getCleanVideos(): CleanVideoDto[] {
    const payload = this.readMockFile();
    const cleanVideos = payload.items.map((item) => this.toCleanVideo(item));

    return cleanVideos.map((video) => ({
      ...video,
    }));
  }

  private readMockFile(): YoutubeApiResponse {
    try {
      const raw = readFileSync(this.dataPath, 'utf-8');
      return JSON.parse(raw) as YoutubeApiResponse;
    } catch {
      throw new InternalServerErrorException(
        'No fue posible leer el archivo mock de YouTube.',
      );
    }
  }

  private toCleanVideo(item: YoutubeVideoItem): CleanVideoDto {
    return {
      thumbnail: this.getThumbnail(item),
      title: item.snippet.title,
      author: item.snippet.channelTitle,
      publishedAtRelative: this.getRelativeTime(item.snippet.publishedAt),
      hypeLevel: Number(this.calculateHype(item).toFixed(4)),
    };
  }

  private getThumbnail(item: YoutubeVideoItem): string {

    const url = item.snippet.thumbnails.high?.url ?? '';

    if (!url) {
        return '';
    }

    return url.replace('via.placeholder.com', 'placehold.co');
    }

  private calculateHype(item: YoutubeVideoItem): number {
    const { statistics, snippet } = item;

    if (statistics.commentCount === undefined) {
      return 0;
    }

    const views = this.toSafeNumber(statistics.viewCount);
    const likes = this.toSafeNumber(statistics.likeCount);
    const comments = this.toSafeNumber(statistics.commentCount);

    if (views === 0) {
      return 0;
    }

    let hype = (likes + comments) / views;

    if (snippet.title.toLowerCase().includes('tutorial')) {
      hype *= 2;
    }

    return hype;
  }

  private toSafeNumber(value?: string): number {
    const parsed = Number(value ?? '0');
    return Number.isFinite(parsed) ? parsed : 0;
  }

  private getRelativeTime(publishedAt: string): string {
    const publishedDate = new Date(publishedAt);
    const now = new Date();

    const diffInMs = now.getTime() - publishedDate.getTime();

    if (!Number.isFinite(diffInMs) || diffInMs < 0) {
      return 'Hace poco';
    }

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const month = 30 * day;
    const year = 365 * day;

    if (diffInMs < minute) {
      return 'Hace menos de un minuto';
    }

    if (diffInMs < hour) {
      const minutes = Math.floor(diffInMs / minute);
      return `Hace ${minutes} minuto${minutes === 1 ? '' : 's'}`;
    }

    if (diffInMs < day) {
      const hours = Math.floor(diffInMs / hour);
      return `Hace ${hours} hora${hours === 1 ? '' : 's'}`;
    }

    if (diffInMs < month) {
      const days = Math.floor(diffInMs / day);
      return `Hace ${days} día${days === 1 ? '' : 's'}`;
    }

    if (diffInMs < year) {
      const months = Math.floor(diffInMs / month);
      return `Hace ${months} mes${months === 1 ? '' : 'es'}`;
    }

    const years = Math.floor(diffInMs / year);
    return `Hace ${years} año${years === 1 ? '' : 's'}`;
  }
}