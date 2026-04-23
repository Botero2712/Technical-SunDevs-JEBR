import { Controller, Get } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CleanVideoDto } from './videos.types';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  getVideos(): CleanVideoDto[] {
    return this.videosService.getCleanVideos();
  }
}