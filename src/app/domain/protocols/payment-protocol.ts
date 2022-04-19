export interface PaymentProtocol {
    send(data: any): Promise<any>
}