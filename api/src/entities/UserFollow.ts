import {
	CreateDateColumn,
	Entity,
	Index,
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

	@Index()
	@ManyToOne(() => User, (user) => user.followings)
	follower: User;

	@Index()
	@ManyToOne(() => User, (user) => user.followers)
	following: User;

	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
	startedFollowing: Date;
}
