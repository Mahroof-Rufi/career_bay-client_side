import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss'
})
export class FeaturesComponent {

  sampleApplicationData: any[] = [
    { title: 'Apply', status: 'pass' },
    { title: 'Review', status: 'pending' },
    { title: 'Interview', status: 'pending' },
    { title: 'Hire', status: 'pending' }
  ]

  sampleJobdata: any[] = [
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
    }
  ]

  sampleUsersdata: any[] = [
    { profile_url: '../../../assets/profile-3.jpg', fullName: 'Don Thomas', jobTitle: 'Full Stack Development' },
    { profile_url: '../../../assets/profile-5.jpg', fullName: 'Justin George', jobTitle: 'Content Writer' },
    { profile_url: '../../../assets/profile-3.jpg', fullName: 'Edwin Emanual', jobTitle: 'UI UX Designer' }
  ]


}
