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
    { title: 'Business Development Executive', salary: 800, salaryType: 'week', location: 'Banglore',
     workType: 'Full Time', companyDp:'../../../assets/company-dp-1.jpg', campanyName: 'Eside Paris', postedDate: Date.now() },
     
    { title: 'Senior Software Engineer', salary: 800, salaryType: 'week', location: 'Mumbai',
     workType: 'Full Time', companyDp:'../../../assets/company-dp-1.jpg', campanyName: 'Eside Paris', postedDate: Date.now() }
  ]

  sampleUsersdata: any[] = [
    { profile_url: '../../../assets/profile-3.jpg', fullName: 'Don Thomas', jobTitle: 'Full Stack Development' },
    { profile_url: '../../../assets/profile-5.jpg', fullName: 'Justin George', jobTitle: 'Content Writer' },
    { profile_url: '../../../assets/profile-3.jpg', fullName: 'Edwin Emanual', jobTitle: 'UI UX Designer' }
  ]


}
