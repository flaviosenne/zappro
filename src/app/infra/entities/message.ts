import { User } from './user';
import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { MessageModel } from '../../domain/models/message';

@Entity('message')
export class Message implements MessageModel {
    @PrimaryColumn()
    @Generated()
    id: number

    @CreateDateColumn({ name: 'created_at', default: Date.now() })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date

    @Column()
    description: string

    @ManyToOne(() => User, user => user.id, { cascade: false })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User
}