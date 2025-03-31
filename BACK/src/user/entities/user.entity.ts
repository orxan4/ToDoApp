import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ConnectionEntity } from './connection.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => ConnectionEntity, (connection: ConnectionEntity) => connection.connectedUser)
  connections: ConnectionEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  emailAndUsernameToLowerCase() {
    this.email = this.email.toLowerCase();
    this.username = this.username.toLowerCase();
  }
}
