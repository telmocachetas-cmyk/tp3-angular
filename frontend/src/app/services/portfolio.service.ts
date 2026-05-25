import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

export interface PortfolioItem {
  _id?: string;
  ticker: string;
  empresa: string;
  dataDaCompra: Date;
  quantidade: number;
  precoDeCompra: number;
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private apiUrl = 'http://localhost:3000/api/portfolio';
  private portfolioSubject = new BehaviorSubject<PortfolioItem[]>([]);
  public portfolio$ = this.portfolioSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadPortfolio();
  }

  loadPortfolio(): void {
    this.getPortfolio().subscribe(
      data => this.portfolioSubject.next(data),
      error => console.error('Error loading portfolio:', error)
    );
  }

  getPortfolio(): Observable<PortfolioItem[]> {
    return this.http.get<PortfolioItem[]>(this.apiUrl);
  }

  getPortfolioItem(id: string): Observable<PortfolioItem> {
    return this.http.get<PortfolioItem>(`${this.apiUrl}/${id}`);
  }

  addPortfolioItem(item: PortfolioItem): Observable<PortfolioItem> {
    return this.http.post<PortfolioItem>(this.apiUrl, item);
  }

  updatePortfolioItem(id: string, item: PortfolioItem): Observable<PortfolioItem> {
    return this.http.put<PortfolioItem>(`${this.apiUrl}/${id}`, item);
  }

  deletePortfolioItem(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  refreshPortfolio(): void {
    this.loadPortfolio();
  }
}
