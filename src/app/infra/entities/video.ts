import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm"

import { VideoModel } from '../../domain/models/video';
import { User } from './user';

@Entity('video')
export class Video implements VideoModel {
    @PrimaryColumn()
    @Generated()
    id: number

    @CreateDateColumn({ name: 'created_at', default: Date.now() })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date

    @Column()
    extension: string

    @Column()
    content: Buffer

    @Column()
    name: string

    @Column()
    size: string

    @ManyToOne(() => User, user => user.id, { cascade: false })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User
}