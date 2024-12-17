import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string[];
    borderColor?: string;
    fill?: boolean;
  }[];
}



@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule,]
})
export class ReportComponent implements OnInit {
  selectedPeriod: string = 'monthly';
  selectedYear: number = new Date().getFullYear();

  salesData: ChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Sales Revenue',
      data: [65000, 75000, 85000, 95000, 120000, 110000, 130000, 140000, 125000, 115000, 105000, 95000],
      borderColor: '#2FB6A7',
      fill: false
    }]
  };

  propertyTypeData: ChartData = {
    labels: ['Houses', 'Apartments', 'Villas', 'Commercial', 'Land'],
    datasets: [{
      label: 'Property Distribution',
      data: [35, 25, 20, 15, 5],
      backgroundColor: ['#2FB6A7', '#38B2AC', '#4FD1C5', '#81E6D9', '#B2F5EA']
    }]
  };

  topAgents = [
    { name: 'Sarah Johnson', sales: 32, revenue: 4500000, image: 'assets/images/agents/agent-1.jpg' },
    { name: 'Michael Chen', sales: 28, revenue: 3800000, image: 'assets/images/agents/agent-2.jpg' },
    { name: 'Emily Rodriguez', sales: 25, revenue: 3200000, image: 'assets/images/agents/agent-3.jpg' },
    { name: 'David Thompson', sales: 22, revenue: 2900000, image: 'assets/images/agents/agent-4.jpg' }
  ];

  recentTransactions = [
    {
      id: 'TRX001',
      property: 'Luxury Villa',
      buyer: 'John Smith',
      amount: 850000,
      date: new Date('2024-02-15'),
      status: 'Completed'
    },
    {
      id: 'TRX002',
      property: 'Modern Apartment',
      buyer: 'Emma Wilson',
      amount: 425000,
      date: new Date('2024-02-14'),
      status: 'Pending'
    },
    {
      id: 'TRX003',
      property: 'Beach House',
      buyer: 'Michael Brown',
      amount: 675000,
      date: new Date('2024-02-13'),
      status: 'Completed'
    }
  ];

  ngOnInit(): void {
    // Initialize chart data or fetch from service
  }

  updatePeriod(period: string) {
    this.selectedPeriod = period;
    // Update chart data based on selected period
  }

  exportReport() {
    // Implement export functionality
    console.log('Exporting report...');
  }


}