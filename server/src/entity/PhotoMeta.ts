import { Column } from "typeorm"

export class PhotoMeta {
    @Column()
    bird_name?: string

    @Column()
    bird_size: number

    @Column()
    bird_habitat: string

    @Column({ default: 0 })
    total_comments?: number

    @Column({ default: 0 })
    total_views?: number

    @Column({ default: 0 })
    total_likes?: number
}
