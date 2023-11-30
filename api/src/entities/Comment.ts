import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Photo } from "./Photo";
import { User } from "./User";

@Entity("comments")
export class Comment {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Index()
	@Column()
	authorID: string;

	@ManyToOne(() => User, (user) => user.comments)
	@JoinColumn({ name: "authorID", referencedColumnName: "id" })
	author: User;

	@Column({ type: "varchar", length: 20 })
	authorName: string;

	@Column({ type: "text" })
	content: string;

	@ManyToOne(() => Photo, (photo) => photo.comments)
	photo: Photo;

	@Index()
	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
	createdAt: Date;

	@UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
	updatedAt: Date;
}
