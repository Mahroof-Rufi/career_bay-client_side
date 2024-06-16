import { Component, Input } from '@angular/core';
import { Employer } from '../../../features/company/store/employer.model';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss'
})
export class CompanyComponent {
  @Input() viewType: 'Inbox view' | 'Normal view' = 'Normal view';
  @Input() employerData!:Employer;
}
