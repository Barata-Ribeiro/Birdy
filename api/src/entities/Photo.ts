import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";
import { PhotoMeta } from "./PhotoMeta";

@Entity("photos")
export class Photo {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.photos)
  @JoinColumn({ name: "authorID", referencedColumnName: "id" })
  author: User;

  @Column()
  authorID: string;

  @Column({ type: "varchar", length: 20 })
  authorName: string;

  @Column({ type: "text" })
  title: string;

  @Column({ type: "varchar", length: 2048 })
  imageUrl: string;

  @Column(() => PhotoMeta)
  meta: PhotoMeta;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @OneToMany(() => Comment, (comment) => comment.photo, {
    onDelete: "CASCADE",
  })
  comments: Comment[];
}
