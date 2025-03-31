import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class ConnectionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  socketId: string;

  // one user could have many Connections, e.g. one his desktop and one on mobile
  @ManyToOne(() => User, (user: User) => user.connections)
  @JoinColumn()
  connectedUser: User;
}
