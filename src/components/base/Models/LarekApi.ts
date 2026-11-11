// src/components/LarekApi.ts

import { IApi } from '../../../types/index';
import { IProductListResponse, IOrderRequest, IOrderResponse } from '../../../types/index';

export class LarekApi {
  private api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  getProducts(): Promise<IProductListResponse> {
    return this.api.get<IProductListResponse>('/product/');
  }

  createOrder(order: IOrderRequest): Promise<IOrderResponse> {
    return this.api.post<IOrderResponse>('/order/', order);
  }
}