import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./users";
import { Review } from "./reviews";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  title!: string;

  @Column()
  author!: string;

  @Column({ nullable: true })
  image?: string;

  @ManyToOne(() => User, (user) => user.addedBooks)
  addedBy!: User;

  @OneToMany(() => Review, (review) => review.book, { cascade: true })
  reviews?: Review[];

  @ManyToMany(() => User, (user) => user.readBooks, {onDelete: "CASCADE"})
  readByUsers?: User[];
}
