import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Photo } from "./Photo";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: "authorID" })
  authorID: User;

  @Column({ type: "text" })
  content: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  date: Date;

  @ManyToOne(() => Photo, (photo) => photo.comments)
  photo: Photo;
}
