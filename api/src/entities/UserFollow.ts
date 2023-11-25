import {
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	Unique,
} from "typeorm";
import { User } from "./User";

@Entity("user_follows")
@Unique(["follower", "following"])
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
