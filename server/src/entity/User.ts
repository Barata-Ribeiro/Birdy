import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm"
import { Comment } from "./Comment"
import { Photo } from "./Photo"
import { UserFollow } from "./UserFollow"
import { UserLike } from "./UserLike"
import { UserRole } from "./enums/Roles"

@Entity("birdy_users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ unique: true, nullable: false })
    @Index({ unique: true })
    username: string

    @Column({ nullable: false })
    display_name: string

    @Column({ nullable: false })
    password: string

    @Column({ unique: true, nullable: false })
    @Index({ unique: true })
    email: string

    @Column({ type: "enum", enum: UserRole, default: UserRole.MEMBER })
    role: UserRole

    @Column({ nullable: true })
    avatar_url?: string

    @Column({ nullable: true })
    cover_image_url?: string

    @Column({ nullable: true, default: "I am a new member!" })
    bio?: string

    @OneToMany(() => Photo, (photo) => photo.author, {
        cascade: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    photos?: Photo[]

    @OneToMany(() => UserLike, (like) => like.user, {
        cascade: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    likes?: UserLike[]

    @OneToMany(() => Comment, (comment) => comment.author, {
        cascade: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    comments?: Comment[]

    @OneToMany(() => UserFollow, (userFollow) => userFollow.follower, {
        cascade: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    followings?: UserFollow[]

    @OneToMany(() => UserFollow, (userFollow) => userFollow.following, {
        cascade: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    followers?: UserFollow[]

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date

    @UpdateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP"
    })
    updatedAt: Date
}
