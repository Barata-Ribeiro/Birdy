import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from "typeorm";
import { Comment } from "./Comment";
import { Photo } from "./Photo";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text", unique: true })
  @Index()
  username: string;

  @Column({ type: "text" })
  password: string;

  @Column({ type: "text", unique: true })
  @Index()
  email: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @OneToMany(() => Comment, (comment) => comment.authorID, { cascade: true })
  comments: Comment[];

  @OneToMany(() => Photo, (photo) => photo.authorID, { cascade: true })
  photos: Photo[];
}
