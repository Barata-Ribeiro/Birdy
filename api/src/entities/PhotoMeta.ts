import { Column } from "typeorm";

export class PhotoMeta {
  @Column({ type: "int" })
  birdSize: number;

  @Column({ type: "text" })
  birdHabitat: string;

  @Column({ type: "int", default: 0 })
  total_comments: number;

  @Column({ type: "int", default: 0 })
  hits: number;

  @Column({ type: "int", default: 0 })
  likes: number;
}
