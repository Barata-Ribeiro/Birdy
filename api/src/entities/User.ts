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

  @Column({ type: "varchar", length: 20, unique: true, nullable: false })
  @Index()
  username: string;

  @Column({ type: "varchar", length: 128, nullable: false })
  password: string;

  @Column({ type: "varchar", length: 255, unique: true, nullable: false })
  @Index()
  email: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @OneToMany(() => Comment, (comment) => comment.authorID, {
    cascade: true,
    onDelete: "CASCADE",
  })
  comments: Comment[];

  @OneToMany(() => Photo, (photo) => photo.authorID, {
    cascade: true,
    onDelete: "CASCADE",
  })
  photos: Photo[];

  @Column({ type: "text", nullable: true })
  refreshToken?: string;
}
