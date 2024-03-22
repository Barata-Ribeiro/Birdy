import {
    CreateDateColumn,
    Entity,
    Index,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique
} from "typeorm"
import { User } from "./User"

@Entity("birdy_user_follows")
@Unique(["follower", "following"])
export class UserFollow {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @ManyToOne(() => User, (user) => user.followings)
    @Index({ unique: true })
    follower: User

    @ManyToOne(() => User, (user) => user.followers)
    @Index({ unique: true })
    following: User

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    started_following: Date
}
