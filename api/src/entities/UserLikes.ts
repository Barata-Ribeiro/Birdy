import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	Unique,
} from "typeorm";
import { Photo } from "./Photo";
import { User } from "./User";

@Entity("user_likes")
@Unique(["user", "photo"])
export class UserLikes {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Index()
	@Column()
	userId: string;

	@ManyToOne(() => User, (user) => user.likes)
	@JoinColumn({ name: "userId", referencedColumnName: "id" })
	user: User;

	@Index()
	@Column()
	photoId: string;

	@ManyToOne(() => Photo, (photo) => photo.likes)
	@JoinColumn({ name: "photoId", referencedColumnName: "id" })
	photo: Photo;

	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
	likedAt: Date;
}
