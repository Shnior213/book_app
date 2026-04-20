import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./users";
import { Review } from "./reviews";
import { Category } from "./category";

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

  @ManyToOne(() => User, (user) => user.addedBooks, { onDelete: "CASCADE" })
  addedBy!: User;

  @OneToMany(() => Review, (review) => review.book, { cascade: true })
  reviews?: Review[];

  @ManyToMany(() => User, (user) => user.readBooks)
  readByUsers?: User[];

  @ManyToMany(() => Category, (category) => category.books, { cascade: true })
  @JoinTable()
  categories?: Category[];
}
