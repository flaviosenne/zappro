import { UserModel } from './../../domain/models/user';
import { Column, CreateDateColumn, Entity, Generated, PrimaryColumn, UpdateDateColumn } from "typeorm";


@Entity('user')
export class User implements UserModel {
    @PrimaryColumn()
    @Generated()
    id: number

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