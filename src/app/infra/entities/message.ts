import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import * as uuid from 'uuid'

import { MessageModel } from '../../domain/models/message';
import { User } from './user';

@Entity('message')
export class Message implements MessageModel {

    constructor() {
        this.id = uuid.v4()
    }

    @PrimaryColumn()
    id: string

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