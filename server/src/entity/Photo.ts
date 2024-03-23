import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm"
import { Comment } from "./Comment"
import { PhotoMeta } from "./PhotoMeta"
import { User } from "./User"
import { UserLike } from "./UserLike"

@Entity("birdy_photos")
export class Photo {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    image_url: string

    @Column()
    slug: string

    @Column(() => PhotoMeta)
    meta: PhotoMeta

    @ManyToOne(() => User, (user) => user.photos)
    author: User

    @OneToMany(() => UserLike, (like) => like.photo, {
        cascade: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    likes?: UserLike[]

    @OneToMany(() => Comment, (comment) => comment.photo, {
        cascade: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    comments?: Comment[]

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date

    @UpdateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP"
    })
    updatedAt: Date
}
