import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";
import { PhotoMeta } from "./PhotoMeta";

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.photos)
  @JoinColumn({ name: "authorID" })
  authorID: User;

  @Column({ type: "text" })
  title: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  date: Date;

  @Column({ type: "text" })
  imageUrl: string;

  @Column({ type: "int", default: 0 })
  total_comments: number;

  @OneToMany(() => Comment, (comment) => comment.photo)
  comments: Comment[];

  @Column(() => PhotoMeta)
  meta: PhotoMeta;
}
