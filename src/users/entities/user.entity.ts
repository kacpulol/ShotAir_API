import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    name?: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({ nullable: false})
    salt?: string;
}
