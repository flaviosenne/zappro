export interface AuthenticateProtocol {
    generateToken(payload: any): string
    isValidToken(token: string): boolean
    retrievePayload(token: string): any
}