import { ManyToOne, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.id)
    user: User;

    @Column()
    url: string;

    @Column()
    hashtags: string;

    @Column()
    description: string;

    @Column()
    likeCounter?: number;
}