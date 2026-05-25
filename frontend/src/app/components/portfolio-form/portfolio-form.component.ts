import { Component } from '@angular/core';
import { PortfolioService, PortfolioItem } from '../../services/portfolio.service';

@Component({
  selector: 'app-portfolio-form',
  templateUrl: './portfolio-form.component.html',
  styleUrls: ['./portfolio-form.component.css']
})
export class PortfolioFormComponent {
  formData: PortfolioItem = {
    ticker: '',
    empresa: '',
    dataDaCompra: new Date(),
    quantidade: 0,
    precoDeCompra: 0
  };

  submitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(private portfolioService: PortfolioService) { }

  onSubmit(): void {
    if (!this.formData.ticker || !this.formData.empresa || this.formData.quantidade <= 0 || this.formData.precoDeCompra <= 0) {
      this.errorMessage = 'Por favor, preencha todos os campos corretamente.';
      return;
    }

    this.submitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.portfolioService.addPortfolioItem(this.formData).subscribe(
      () => {
        this.successMessage = 'Ação adicionada com sucesso!';
        this.resetForm();
        this.portfolioService.refreshPortfolio();
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      (error) => {
        this.errorMessage = 'Erro ao adicionar ação: ' + (error.error?.message || error.message);
        console.error('Error:', error);
      },
      () => {
        this.submitting = false;
      }
    );
  }

  resetForm(): void {
    this.formData = {
      ticker: '',
      empresa: '',
      dataDaCompra: new Date(),
      quantidade: 0,
      precoDeCompra: 0
    };
  }

  formatDateInput(): string {
    const date = new Date(this.formData.dataDaCompra);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onDateChange(event: any): void {
    this.formData.dataDaCompra = event.target.value;
  }
}
