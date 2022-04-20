export interface PaymentProtocol {
    send(data: any, userId: string): Promise<any>
}