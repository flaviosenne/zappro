import { UserModel } from './../../../domain/models/user';
import { User } from './../../../infra/entities/user';

export interface CreateAccount {
    name: string
    email: string
    password: string
}

export interface ResponseUserAccount {
    id: number
    name: string
    email: string
    createdAt: Date
    updatedAt: Date
    isActive: boolean
    lastLogin: Date
}

export class CreateAccountDto {
    static of(dto: CreateAccount): User {
        const { name, email, password } = dto

        const user = new User()

        user.name = name
        user.email = email
        user.password = password
        user.createdAt = new Date()
        user.updatedAt = new Date()
        user.isActive = true

        return user
    }

    static ofResponse(user: UserModel): ResponseUserAccount {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            isActive: user.isActive,
            lastLogin: user.lastLogin,
        }

    }
}

