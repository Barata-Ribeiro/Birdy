import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm"
import { Photo } from "./Photo"
import { User } from "./User"

@Entity("birdy_user_likes")
@Unique(["user", "photo"])
export class UserLike {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @ManyToOne(() => User, (user) => user.likes)
    user: User

    @ManyToOne(() => Photo, (photo) => photo.likes)
    photo: Photo

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    liked_at: Date
}
