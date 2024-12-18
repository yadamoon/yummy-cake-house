import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ReportData } from '../../model/report.model';


@Injectable({
  providedIn: 'root'
})
export class ReportService {
  getReportData(): Observable<ReportData> {
    // Mocked data; replace with API call
    return of({
      salesData: {
        labels: ['Jan', 'Feb', 'Mar'],
        datasets: [{ label: 'Sales Revenue', data: [1000, 2000, 3000] }]
      },
      propertyTypeData: {
        labels: ['Houses', 'Apartments'],
        datasets: [{ label: 'Property Distribution', data: [60, 40] }]
      },
      topAgents: [
        { name: 'Agent A', sales: 10, revenue: 100000, image: 'assets/images/agents/agent-1.jpg' }
      ],
      recentTransactions: [
        { id: 'TX001', property: 'Villa', buyer: 'John', amount: 500000, date: new Date(), status: 'Completed' }
      ]
    });
  }

  exportToPdf() {
    console.log('Exporting report to PDF...');
    // Implement export functionality
  }
}
