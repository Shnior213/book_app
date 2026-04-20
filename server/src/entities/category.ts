import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./books";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @ManyToMany(() => Book, (book) => book.categories)
  books?: Book[];
}
