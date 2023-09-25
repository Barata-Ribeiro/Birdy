import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Photo } from "./Photo";

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  authorID: string;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: "authorID", referencedColumnName: "id" })
  author: User;

  @Column({ type: "varchar", length: 20 })
  authorName: string;

  @Column({ type: "text" })
  content: string;

  @ManyToOne(() => Photo, (photo) => photo.comments)
  photo: Photo;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
