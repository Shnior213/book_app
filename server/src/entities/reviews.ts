import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./users";
import { Book } from "./books";

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  content?: string;

  @Column({ type: "int" })
  rating!: number;

  @ManyToOne(() => User, (user) => user.reviews)
  user!: User;

  @ManyToOne(() => Book, (book) => book.reviews, { onDelete: "CASCADE" })
  book!: Book;
}
