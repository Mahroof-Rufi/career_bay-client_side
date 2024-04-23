import { Component } from '@angular/core';

@Component({
  selector: 'app-job-overview',
  templateUrl: './job-overview.component.html',
  styleUrl: './job-overview.component.scss'
})
export class JobOverviewComponent {
  sampleJobdata: any[] = [
    { title: 'Business Development Executive', salary: 800, salaryType: 'week', location: 'Banglore',
     workType: 'Full Time', companyDp:'../../../assets/company-dp-1.jpg', campanyName: 'Eside Paris', postedDate: Date.now() },
     
    { title: 'Senior Software Engineer', salary: 800, salaryType: 'week', location: 'Mumbai',
     workType: 'Full Time', companyDp:'../../../assets/company-dp-1.jpg', campanyName: 'Eside Paris', postedDate: Date.now() },

    { title: 'Mern Stack Developer', salary: 650, salaryType: 'week', location: 'Chennai',
     workType: 'Full Time', companyDp:'../../../assets/company-dp-1.jpg', campanyName: 'Eside Paris', postedDate: Date.now() },
     
    { title: 'Senior Devops Engineer', salary: 750, salaryType: 'week', location: 'Kochi',
     workType: 'Full Time', companyDp:'../../../assets/company-dp-1.jpg', campanyName: 'Eside Paris', postedDate: Date.now() },

    { title: 'Senior Sales Execitive', salary: 700, salaryType: 'week', location: 'Banglore',
     workType: 'Full Time', companyDp:'../../../assets/company-dp-1.jpg', campanyName: 'Eside Paris', postedDate: Date.now() },
     
    { title: 'Senior Data Engineer', salary: 800, salaryType: 'week', location: 'Mumbai',
     workType: 'Full Time', companyDp:'../../../assets/company-dp-1.jpg', campanyName: 'Eside Paris', postedDate: Date.now() },

    { title: 'Senior Accountant', salary: 700, salaryType: 'week', location: 'Banglore',
     workType: 'Full Time', companyDp:'../../../assets/company-dp-1.jpg', campanyName: 'Eside Paris', postedDate: Date.now() },
     
    { title: 'Senior Data Engineer', salary: 800, salaryType: 'week', location: 'Mumbai',
     workType: 'Full Time', companyDp:'../../../assets/company-dp-1.jpg', campanyName: 'Eside Paris', postedDate: Date.now() }
  ]
}
