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

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.likes, { eager: true })
  @JoinColumn({ name: "userId", referencedColumnName: "id" })
  user: User;

  @Column()
  photoId: string;

  @ManyToOne(() => Photo, (photo) => photo.likes, { eager: true })
  @JoinColumn({ name: "photoId", referencedColumnName: "id" })
  photo: Photo;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  likedAt: Date;

  @Column({ type: "boolean", default: true })
  isActive: boolean;
}
