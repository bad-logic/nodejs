import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

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

  constructor(title:string,description:string,due_date:Date) {
    this.description = description;
    this.title = title;
    this.due_date = due_date;
  }
}