import { User } from 'src/users/entities/user.entity';

export class CreatePostDto {
  hashtags: string;
  url: string;
  description: string;
  user: User;
}
