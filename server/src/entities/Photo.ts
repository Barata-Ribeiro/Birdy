import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { PhotoMeta } from "./PhotoMeta";

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.photos)
  @JoinColumn({ name: "authorID" })
  authorID: User;

  @Column()
  title: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  date: Date;

  @Column()
  src: string;

  @Column()
  total_comments: number;

  @Column(() => PhotoMeta)
  meta: PhotoMeta;
}
