import { Component, OnInit } from '@angular/core';
import { UserChatService } from '../../../features/user/services/user-chat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User, userStateModel } from '../../../features/user/user-store/user.model';
import { Store } from '@ngrx/store';
import { getUserId } from '../../../features/user/user-store/user.selector';
import { UserAPIServiceService } from '../../../features/user/services/user-api-service.service';
import { Chat } from '../../../models/chat';
import { EmployerApiServiceService } from '../../../features/company/services/employer-api-service.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.scss'
})
export class InboxComponent implements OnInit{
  
  profileType: string = 'Users'
  user_id!:string;
  receiver_id:string | null = null;
  oppositeUserData!:User | any; 

  connections: any;
  messages: Chat[] = []

  message:string = ''

  constructor(
    private readonly _userChat:UserChatService,
    private readonly _userAPIs:UserAPIServiceService,
    private readonly _activatedRoute:ActivatedRoute,
    private readonly _router:Router,
    private readonly _userStore:Store<{ user:userStateModel }>
  ) {}

  ngOnInit(): void {
    this._activatedRoute.queryParamMap.subscribe({
      next: queries => {
        const profileTypeQuery = queries.get('profileType')
        if (profileTypeQuery) {
          this.profileType = profileTypeQuery          
          this.getUserConnections()
        }
      }
    })

    this._activatedRoute.paramMap.subscribe({
      next: params => {
        this.receiver_id = params.get('id')        
        this.loadChat()
      }
    })

    this._userStore.select(getUserId).subscribe( id => {
      this.user_id = id
      this._userChat.addUser(this.user_id);
    })

    this._userChat.onMessage().subscribe(message => {
      this.messages.push(message);
    });

    this.getUserConnections()
  }

  loadChat() {
    if (this.receiver_id) {
      const isConnectionExist = this.connections?.connections?.users?.find((connection:any) => connection._id == this.receiver_id)
      if (isConnectionExist) {
        this.oppositeUserData = isConnectionExist
      } else {
        if (this.profileType == 'Users') {
          this._userAPIs.fetchUserProfileById(this.receiver_id).subscribe({
            next: response => this.oppositeUserData = response.userData
          })
        } else if (this.profileType == 'Employers') {
          this._userAPIs.fetchEmployerProfileById(this.receiver_id).subscribe({
            next: response => {
              this.oppositeUserData = response.employerData 
            }
          })
        }
        this.getMessages()
      }
    }
  }

  getUserConnections() {
    this._userChat.getUserConnections().subscribe({
      next: (res:any) => {       
        console.log(res);
         
        this.connections = res.connections
      }
    })
  }

  getMessages() {
    if (this.receiver_id) {
      this._userChat.getMessagesByReceiverId(this.receiver_id).subscribe({
        next: response => this.messages = response.chats
      })      
    }
  }

  sendMessage(): void {
    if (this.message.trim() === '') return;

    if (this.message.trim() && this.receiver_id) {
      const message = {
        sender: this.user_id,
        receiver: this.receiver_id,
        content: this.message,
        profileType: this.profileType,
        createdAt: new Date()
      };
  
      this._userChat.sendMessage(this.user_id, this.receiver_id, this.message, new Date(), this.profileType);
      this.message = '';      
      if (this.messages.length == 0) {        
        this._userChat.addConnection(this.receiver_id, this.profileType === 'Users').subscribe({
          next: (response:any) => this.connections = response.connections
        })
      }
    }
    
  }

  showUsers() {
    const queryParams = { profileType: 'Users' };
    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge' 
    });
  }

  showEmployers() {
    const queryParams = { profileType: 'Employers' };
    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge' 
    });
  }

  trackByCreated(index: number, message: any): Date {
    return message.createdAt;
  }

}
