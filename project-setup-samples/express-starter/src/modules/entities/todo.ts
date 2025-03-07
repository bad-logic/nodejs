import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, UpdateDateColumn } from "typeorm";
import { Category } from "@modules/entities/category";

@Entity()
export class Todo{
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: "timestamptz" })
  due_date: Date;

  @Column({default:false})
  complete:boolean  = false;

  @CreateDateColumn()
  created_at: Date | undefined;

  @UpdateDateColumn()
  updated_at: Date | undefined;

  @ManyToOne(() => Category, (category) => category.todos)
  category: Category | undefined;

  constructor(title:string,description:string,due_date:Date) {
    this.description = description;
    this.title = title;
    this.due_date = due_date;
  }
}