import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../service/report/report.service';
import { ChartData, Transaction } from '../../model/report.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  selectedPeriod: string = 'monthly';
  selectedYear: number = new Date().getFullYear();

  salesData!: ChartData;
  propertyTypeData!: ChartData;
  topAgents!: { name: string; sales: number; revenue: number; image: string }[];
  recentTransactions!: Transaction[];
  popularProducts = [
    { name: 'Chocolate Cake', sales: 150, revenue: 1200, image: 'chocolate.jpg' },
    { name: 'Vanilla Cake', sales: 100, revenue: 900, image: 'vanilla.jpg' },
    { name: 'Red Velvet Cake', sales: 75, revenue: 850, image: 'red-velvet.jpg' },
  ];
  recentOrders = [
    { id: 1, product: 'Chocolate Cake', customer: 'Alice', amount: 50, date: new Date(), status: 'Completed' },
    { id: 2, product: 'Vanilla Cake', customer: 'Bob', amount: 45, date: new Date(), status: 'Pending' },
  ];

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.loadReportData();
  }

  loadReportData() {
    this.reportService.getReportData().subscribe((data) => {
      this.salesData = data.salesData;
      this.propertyTypeData = data.propertyTypeData;
      this.topAgents = data.topAgents;
      this.recentTransactions = data.recentTransactions;
    });
  }

  updatePeriod(period: string) {
    this.selectedPeriod = period;
    this.loadReportData(); // Reload data for the selected period
  }

  exportReport() {
    this.reportService.exportToPdf();
  }
}
