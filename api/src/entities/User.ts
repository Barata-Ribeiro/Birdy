import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Comment } from "./Comment";
import { Photo } from "./Photo";
import { UserFollow } from "./UserFollow";
import { UserLikes } from "./UserLikes";

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

	@Column({ type: "varchar" })
	avatarUrl: string;

	@Column({ type: "varchar" })
	coverImageUrl: string;

	@Column({ type: "varchar", length: 150 })
	biography: string;

	@OneToMany(() => Comment, (comment) => comment.author, {
		cascade: true,
		onDelete: "CASCADE",
	})
	comments?: Comment[];

	@OneToMany(() => Photo, (photo) => photo.author, {
		cascade: true,
		onDelete: "CASCADE",
	})
	photos?: Photo[];

	@OneToMany(() => UserLikes, (userLikes) => userLikes.user, {
		cascade: true,
		onDelete: "CASCADE",
	})
	likes?: UserLikes[];

	@OneToMany(() => UserFollow, (userFollow) => userFollow.follower, {
		cascade: true,
		onDelete: "CASCADE",
	})
	followings: UserFollow[];

	@OneToMany(() => UserFollow, (userFollow) => userFollow.following, {
		cascade: true,
		onDelete: "CASCADE",
	})
	followers: UserFollow[];

	@Column({ type: "text", nullable: true })
	refreshToken?: string;

	@Column({
		type: "enum",
		enum: ["member", "admin"],
		default: "member",
	})
	role: string;

	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
	createdAt: Date;

	@UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
	updatedAt: Date;
}
