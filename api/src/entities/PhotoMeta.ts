import { Column } from "typeorm";

export class PhotoMeta {
  @Column({ type: "int" })
  size: number;

  @Column({ type: "text" })
  habitat: string;

  @Column({ type: "int" })
  access: number;
}
