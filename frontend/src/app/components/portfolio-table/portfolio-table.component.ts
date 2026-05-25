import { Component, OnInit } from '@angular/core';
import { PortfolioService, PortfolioItem } from '../../services/portfolio.service';
import { StockPriceService, StockPrice } from '../../services/stock-price.service';
import { forkJoin } from 'rxjs';

interface PortfolioRow extends PortfolioItem {
  cotacaoDoDia?: number;
  valor?: number;
  variacao?: number;
  variacaoPercent?: number;
  stockPrice?: StockPrice;
}

@Component({
  selector: 'app-portfolio-table',
  templateUrl: './portfolio-table.component.html',
  styleUrls: ['./portfolio-table.component.css']
})
export class PortfolioTableComponent implements OnInit {
  portfolioItems: PortfolioRow[] = [];
  loading = false;
  totalAquisicao = 0;
  totalAtual = 0;
  totalVariacao = 0;
  totalVariacaoPercent = 0;

  constructor(
    private portfolioService: PortfolioService,
    private stockPriceService: StockPriceService
  ) { }

  ngOnInit(): void {
    this.loadPortfolioWithPrices();
    this.portfolioService.portfolio$.subscribe(() => {
      this.loadPortfolioWithPrices();
    });
  }

  loadPortfolioWithPrices(): void {
    this.loading = true;
    this.portfolioService.getPortfolio().subscribe(
      items => {
        this.portfolioItems = items as PortfolioRow[];
        
        if (this.portfolioItems.length === 0) {
          this.loading = false;
          this.resetTotals();
          return;
        }

        const priceRequests = this.portfolioItems.map(item =>
          this.stockPriceService.getStockPrice(item.ticker)
        );

        forkJoin(priceRequests).subscribe(prices => {
          this.portfolioItems.forEach((item, index) => {
            const price = prices[index];
            item.stockPrice = price;
            item.cotacaoDoDia = price.price;
            item.valor = item.quantidade * item.cotacaoDoDia;
            item.variacao = item.valor - (item.quantidade * item.precoDeCompra);
            item.variacaoPercent = ((item.cotacaoDoDia - item.precoDeCompra) / item.precoDeCompra) * 100;
          });

          this.calculateTotals();
          this.loading = false;
        });
      }
    );
  }

  calculateTotals(): void {
    this.totalAquisicao = 0;
    this.totalAtual = 0;
    this.totalVariacao = 0;

    this.portfolioItems.forEach(item => {
      this.totalAquisicao += item.quantidade * item.precoDeCompra;
      this.totalAtual += item.valor || 0;
    });

    this.totalVariacao = this.totalAtual - this.totalAquisicao;
    this.totalVariacaoPercent = (this.totalVariacao / this.totalAquisicao) * 100;
  }

  getVariacaoColor(variacao?: number): string {
    if (!variacao && variacao !== 0) return 'text-dark';
    if (variacao > 0) return 'text-success';
    if (variacao < 0) return 'text-danger';
    return 'text-dark';
  }

  getTotalVariacaoColor(): string {
    if (this.totalVariacao > 0) return 'text-success';
    if (this.totalVariacao < 0) return 'text-danger';
    return 'text-dark';
  }

  deleteItem(id?: string): void {
    if (!id) return;
    if (confirm('Tem a certeza que deseja eliminar este item?')) {
      this.portfolioService.deletePortfolioItem(id).subscribe(() => {
        this.portfolioService.refreshPortfolio();
      });
    }
  }

  formatDate(date: any): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('pt-PT');
  }

  resetTotals(): void {
    this.totalAquisicao = 0;
    this.totalAtual = 0;
    this.totalVariacao = 0;
    this.totalVariacaoPercent = 0;
  }

  refresh(): void {
    this.loadPortfolioWithPrices();
  }
}
