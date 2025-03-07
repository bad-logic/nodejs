import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, UpdateDateColumn } from "typeorm";
import { Todo } from "@modules/entities/todo";

@Entity()
export class Category{
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date | undefined;

  @UpdateDateColumn()
  updated_at: Date | undefined;

  @OneToMany(()=>Todo,(todo)=>todo.category)
  todos: Todo[] | undefined;

  constructor(name:string) {
   this.name = name;
  }

  addTodos(todo:Todo){
    if(!this.todos){
      this.todos = [];
    }
    this.todos.push(todo);
  }
}