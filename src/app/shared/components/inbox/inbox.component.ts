import { Component } from '@angular/core';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.scss'
})
export class InboxComponent {

  sampleUser = [
    { _id:1, firstName:'John', lastName:'Snow', profile_url:'../../../../assets/profile-3.jpg', jobTitle:'Full stack developer' },
    { _id:2, firstName:'John', lastName:'Snow', profile_url:'../../../../assets/profile-3.jpg', jobTitle:'Full stack developer' },
    { _id:3, firstName:'John', lastName:'Snow', profile_url:'../../../../assets/profile-3.jpg', jobTitle:'Full stack developer' },
    { _id:4, firstName:'John', lastName:'Snow', profile_url:'../../../../assets/profile-3.jpg', jobTitle:'Full stack developer' },
    { _id:5, firstName:'John', lastName:'Snow', profile_url:'../../../../assets/profile-3.jpg', jobTitle:'Full stack developer' }
  ]

}
