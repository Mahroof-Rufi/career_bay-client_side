import { Component } from '@angular/core';

@Component({
  selector: 'app-job-overview',
  templateUrl: './job-overview.component.html',
  styleUrl: './job-overview.component.scss'
})
export class JobOverviewComponent {
  sampleJobData: any[] = [
    {
      company_id: {
        profile_url:'../../../assets/company-dp-1.jpg', 
        companyName: 'Eside Paris',
      },
      jobTitle: 'Business Development Executive',
      minimumPay: 300000, 
      maximumPay:600000, 
      payType: 'year', 
      city: 'Banglore',
      state: 'Karnataka',
      jobType: 'Full Time', 
      postedAt: Date.now(),
    },
    { 
      company_id: {
        profile_url:'../../../assets/company-dp-1.jpg',
        companyName: 'Eside Paris',
      },
      jobTitle: 'Senior Software Engineer',
      minimumPay: 350000,
      maximumPay: 550000,
      payType: 'year',
      city: 'Pune',
      state: 'Maharashtra',
      jobType: 'Full Time',
      postedAt: Date.now() 
    },
    { 
      company_id: {
        profile_url:'../../../assets/company-dp-1.jpg',
        companyName: 'Eside Paris',
      },
      jobTitle: 'Senior Software Engineer',
      minimumPay: 350000,
      maximumPay: 550000,
      payType: 'year',
      city: 'Pune',
      state: 'Maharashtra',
      jobType: 'Full Time',
      postedAt: Date.now() 
    },
    { 
      company_id: {
        profile_url:'../../../assets/company-dp-1.jpg',
        companyName: 'Eside Paris',
      },
      jobTitle: 'Senior Software Engineer',
      minimumPay: 350000,
      maximumPay: 550000,
      payType: 'year',
      city: 'Pune',
      state: 'Maharashtra',
      jobType: 'Full Time',
      postedAt: Date.now() 
    },
    { 
      company_id: {
        profile_url:'../../../assets/company-dp-1.jpg',
        companyName: 'Eside Paris',
      },
      jobTitle: 'Senior Software Engineer',
      minimumPay: 350000,
      maximumPay: 550000,
      payType: 'year',
      city: 'Pune',
      state: 'Maharashtra',
      jobType: 'Full Time',
      postedAt: Date.now() 
    },
    { 
      company_id: {
        profile_url:'../../../assets/company-dp-1.jpg',
        companyName: 'Eside Paris',
      },
      jobTitle: 'Senior Software Engineer',
      minimumPay: 350000,
      maximumPay: 550000,
      payType: 'year',
      city: 'Pune',
      state: 'Maharashtra',
      jobType: 'Full Time',
      postedAt: Date.now() 
    },
    { 
      company_id: {
        profile_url:'../../../assets/company-dp-1.jpg',
        companyName: 'Eside Paris',
      },
      jobTitle: 'Senior Software Engineer',
      minimumPay: 350000,
      maximumPay: 550000,
      payType: 'year',
      city: 'Pune',
      state: 'Maharashtra',
      jobType: 'Full Time',
      postedAt: Date.now() 
    },
    { 
      company_id: {
        profile_url:'../../../assets/company-dp-1.jpg',
        companyName: 'Eside Paris',
      },
      jobTitle: 'Senior Software Engineer',
      minimumPay: 350000,
      maximumPay: 550000,
      payType: 'year',
      city: 'Pune',
      state: 'Maharashtra',
      jobType: 'Full Time',
      postedAt: Date.now() 
    }
  ]

  trackByFn(index: number, item: any): number {
    return item.id; 
  }
}
