import {
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity("user_follows")
export class UserFollow {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@ManyToOne(() => User, (user) => user.followings)
	follower: User;

	@ManyToOne(() => User, (user) => user.followers)
	following: User;

	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
	startedFollowing: Date;
}
