export interface CriptographyProtocol {
    encrypt(password: string): Promise<string>
    isMatcher(password: string, hash: string): boolean
}