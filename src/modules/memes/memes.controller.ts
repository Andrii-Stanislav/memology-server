import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiSecurity,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { JwtAuthGuard, SuperAdminGuard } from '../../guards';

import { MemesService } from './memes.service';
import { Meme } from './memes.model';
import { CreateMemeDto, CreateMemeExternalDto } from './dto';

@ApiSecurity('super-admin')
@ApiBearerAuth()
@ApiTags('Meme route')
@UseGuards(JwtAuthGuard)
@Controller('memes')
export class MemesController {
  constructor(private readonly memeService: MemesService) {}

  @ApiOperation({ summary: 'Get all memes' })
  @ApiResponse({ status: 200, type: [Meme] })
  @Get()
  getAllMemes() {
    return this.memeService.getAllMemes();
  }

  @ApiOperation({ summary: 'Get meme' })
  @ApiResponse({ status: 200, type: [Meme] })
  @Get(':id')
  getMemeById(@Param('id') id: number) {
    return this.memeService.getMemeById(id);
  }

  // getMemeById

  @UseGuards(SuperAdminGuard)
  @ApiOperation({ summary: 'Create meme' })
  @ApiResponse({ status: 200, type: Meme })
  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createMeme(
    @Body() memeDto: CreateMemeDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.memeService.createMeme(memeDto, image);
  }

  @UseGuards(SuperAdminGuard)
  @ApiOperation({ summary: 'Create meme' })
  @ApiResponse({ status: 200, type: Meme })
  @Post('/external-image')
  createMemeWithExternalImage(@Body() memeDto: CreateMemeExternalDto) {
    return this.memeService.createMemeWithExternalImage(memeDto);
  }
}
