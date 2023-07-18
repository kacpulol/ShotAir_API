import { Controller, Get, Post, Body, Patch, Param, Request, Delete, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateLikeDto } from 'src/likes/dto/create-like.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('like/:id')
  likePost(@Param('id') id: string,  @Request() req: any) {
    return this.postsService.like(id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('unlike/:id')
  unLikePost(@Param('id') id: string,  @Request() req: any) {
    return this.postsService.revokeLike(id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto,  @Request() req: any){
    return this.postsService.create(createPostDto, req.user);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @Request() req: any) {
    return this.postsService.update(id, updatePostDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string,  @Request() req: any) {
    return this.postsService.remove(id, req.user);
  }

}
