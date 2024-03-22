import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm"
import { Photo } from "./Photo"
import { User } from "./User"

@Entity("birdy_comments")
export class Comment {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ nullable: false })
    content: string

    @ManyToOne(() => User, (user) => user.comments)
    author: User

    @ManyToOne(() => Photo, (photo) => photo.comments)
    photo: Photo

    @Column({ type: "boolean", default: false })
    was_edited: boolean

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date

    @UpdateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP"
    })
    updatedAt: Date
}
