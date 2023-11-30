import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Comment } from "./Comment";
import { PhotoMeta } from "./PhotoMeta";
import { User } from "./User";
import { UserLikes } from "./UserLikes";

@Entity("photos")
export class Photo {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Index()
	@Column()
	authorID: string;

	@ManyToOne(() => User, (user) => user.photos)
	@JoinColumn({ name: "authorID", referencedColumnName: "id" })
	author: User;

	@Column({ type: "varchar", length: 20 })
	authorName: string;

	@Index()
	@Column({ type: "text" })
	title: string;

	@Column({ type: "varchar", length: 2048 })
	imageUrl: string;

	@Column(() => PhotoMeta)
	meta: PhotoMeta;

	@OneToMany(() => UserLikes, (userLikes) => userLikes.photo, {
		cascade: true,
		onDelete: "CASCADE",
	})
	likes?: UserLikes[];

	@OneToMany(() => Comment, (comment) => comment.photo, {
		cascade: true,
		onDelete: "CASCADE",
	})
	comments?: Comment[];

	@Index()
	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
	createdAt: Date;

	@Index()
	@UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
	updatedAt: Date;
}
