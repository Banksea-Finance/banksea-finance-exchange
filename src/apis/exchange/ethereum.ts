import bankseaRequest, { BankseaApiResponse } from '../../utils/bankseaRequest'

export function completeOrder(data: any) {
  return bankseaRequest.post<BankseaApiResponse<any>>('/transfer/order/complete', data)
}

export function chooseOrder(data: any) {
  return bankseaRequest.post<BankseaApiResponse<any>>('/transfer/order/select', data)
}
