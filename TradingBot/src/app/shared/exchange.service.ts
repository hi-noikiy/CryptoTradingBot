import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Order, Balances, BuyAndSellRequest, Ticker } from '../data-model';
import { retry } from 'rxjs/operators';

@Injectable()
export class ExchangeService {
  host = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getCurrencyPairs(): Observable<string[]> {
    return this.http.get<string[]>(`${this.host}/currency-pairs`).pipe(retry(5));
  }

  cancelOrders(currencyPair: string) {
    return this.http.post(`${this.host}/orders-cancellation/`, {
      currencyPair: currencyPair
    }).pipe(retry(5));
  }

  getOrders(currencyPair: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.host}/orders/${currencyPair}`).pipe(retry(5));
  }

  getBalances(): Observable<Balances> {
    return this.http.get<Balances>(`${this.host}/balances`).pipe(retry(5));
  }

  getTicker(currencyPair: string): Observable<Ticker> {
    return this.http.get<Ticker>(`${this.host}/ticker/${currencyPair}`).pipe(retry(5));
  }

  buyAndSell(strategy: BuyAndSellRequest): Observable<any> {
    return this.http.post(`${this.host}/commands/buy-and-sell`, strategy);
  }
}
