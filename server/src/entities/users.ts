import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IsString, IsEmail, MinLength } from "class-validator";
import { Book } from "./books";
import { Review } from "./reviews";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @IsEmail()
  @Column({ unique: true })
  email!: string;

  @MinLength(6)
  @Column()
  password!: string;

  @Column({ default: false })
  isAdmin!: boolean;

  @Column({type: "text", nullable: true })
  refreshToken?: string | null;

  @OneToMany(() => Book, (book) => book.addedBy)
  addedBooks?: Book[];

  @OneToMany(() => Review, (review) => review.user)
  reviews?: Review[];

  @ManyToMany(() => Book, (book) => book.readByUsers)
  @JoinTable()
  readBooks?: Book[];
}
