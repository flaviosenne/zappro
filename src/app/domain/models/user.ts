export interface UserModel {
    id: number
    name: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
    isActive: boolean
    lastLogin: Date
}

