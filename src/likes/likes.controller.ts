import { Controller, Get, Post, Body, Patch, Param, Request, Delete, UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';

@Controller()
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

}
