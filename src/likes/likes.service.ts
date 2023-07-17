import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LikesService {

  constructor(
    @InjectRepository(Like)
    private likesRepository: Repository<Like>,
  ) {}

  create(user: any, post: any) {
    const like = this.likesRepository.create({user, post});
    return this.likesRepository.save(like);
  }

  delete(user: any, post: any) {
    return this.likesRepository.delete({user, post});
  }

  findAll() {
    return this.likesRepository.find();
  }

  findOne(id: string) {
    return this.likesRepository.findOneBy({id});
  }

  async update(id: string, updateUserDto: UpdateLikeDto) {
    const user = await this.findOne(id);
    //return this.likesRepository.save({...user, ...updateUserDto});
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    //return this.likesRepository.remove(user);
  }
}
