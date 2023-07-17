import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { LikesModule } from './likes/likes.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UsersModule, PostsModule, AuthModule, LikesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
