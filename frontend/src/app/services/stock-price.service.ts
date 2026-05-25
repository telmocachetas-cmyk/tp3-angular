import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface StockPrice {
  ticker: string;
  price: number;
  change: number;
  changePercent: number;
}

@Injectable({
  providedIn: 'root'
})
export class StockPriceService {
  private apiUrl = 'http://localhost:3000/api/stock-price';

  constructor(private http: HttpClient) { }

  getStockPrice(ticker: string): Observable<StockPrice> {
    return this.http.get<StockPrice>(`${this.apiUrl}/${ticker}`).pipe(
      catchError(error => {
        console.error('Error fetching stock price:', error);
        return of({
          ticker: ticker,
          price: 0,
          change: 0,
          changePercent: 0
        } as StockPrice);
      })
    );
  }
}
