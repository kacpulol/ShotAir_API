import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { LikesService } from 'src/likes/likes.service';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,

    private likesService: LikesService
  ) {}

  create(createPostDto: CreatePostDto, user: any) {
    createPostDto.hashtags = this.addHashBeforeWords(createPostDto.hashtags);
    const post = this.postsRepository.create({...createPostDto, user});
    return this.postsRepository.save(post);
  }

  findAll() {
    return this.postsRepository.find({relations: ['user']});
  }

  findOne(id: string) {
    return this.postsRepository.findOneBy({id});
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.findOne(id);
    return this.postsRepository.save({...post, ...updatePostDto});
  }

  async remove(id: string) {
    const post = await this.findOne(id);
    return this.postsRepository.remove(post);
  }

  async like(id: string, req: any) {
    
    await this.likesService.create(req.user, {id});
    return this.postsRepository.increment({id}, 'likeCounter', 1);
  }
  
  async revokeLike(id: string, req: any) {
    await this.likesService.delete(req.id, id);
    return this.postsRepository.decrement({id}, 'likeCounter', 1);
  }

  addHashBeforeWords(str: string): string {
    const words: string[] = str.split(" ");
    const result: string = "#" + words.join(" #");
    return result;
  }
}
