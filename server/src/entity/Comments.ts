import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn("uuid")
    id: string;

  @Column()
    "comment-author": string;

  @Column()
    "comment-content": string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    "comment-date": Date;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "comment-authorID" })
    "comment-authorID": User;
}
