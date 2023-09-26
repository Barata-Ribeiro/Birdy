import {
  Entity,
  Unique,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Photo } from "./Photo";

@Entity("user_likes")
@Unique(["user", "photo"])
export class UserLikes {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: User;

  @ManyToOne(() => Photo)
  @JoinColumn({ name: "photo_id", referencedColumnName: "id" })
  photo: Photo;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  likedAt: Date;

  @Column({ type: "boolean", default: true })
  isActive: boolean;
}
