import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import * as uuid from 'uuid'

import { UserModel } from './../../domain/models/user';

@Entity('user')
export class User implements UserModel {
    constructor() {
        this.id = uuid.v4()
    }
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @CreateDateColumn({ name: 'created_at', default: Date.now() })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date

    @Column({ name: 'is_active' })
    isActive: boolean

    @CreateDateColumn({ name: 'last_login' })
    lastLogin: Date

}