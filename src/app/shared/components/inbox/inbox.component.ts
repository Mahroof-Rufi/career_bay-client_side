import { Component, OnInit } from '@angular/core';
import { UserChatService } from '../../../features/user/services/user-chat.service';
import { ActivatedRoute } from '@angular/router';
import { User, userStateModel } from '../../../features/user/user-store/user.model';
import { Store } from '@ngrx/store';
import { getUserId } from '../../../features/user/user-store/user.selector';
import { UserAPIServiceService } from '../../../features/user/services/user-api-service.service';
import { Chat } from '../../../models/chat';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.scss'
})
export class InboxComponent implements OnInit{
  
  user_id!:string;
  receiver_id:string | null = null;
  oppositeUserData!:User | any; 
  connections: any[] = []
  messages: Chat[] = []

  message:string = ''

  sampleUser = [
    { _id:'1', firstName:'John', lastName:'Snow', profile_url:'../../../../assets/profile-3.jpg', jobTitle:'Full stack developer' },
    { _id:'2', firstName:'John', lastName:'Snow', profile_url:'../../../../assets/profile-3.jpg', jobTitle:'Full stack developer' },
    { _id:'3', firstName:'John', lastName:'Snow', profile_url:'../../../../assets/profile-3.jpg', jobTitle:'Full stack developer' },
    { _id:'4', firstName:'John', lastName:'Snow', profile_url:'../../../../assets/profile-3.jpg', jobTitle:'Full stack developer' },
    { _id:'5', firstName:'John', lastName:'Snow', profile_url:'../../../../assets/profile-3.jpg', jobTitle:'Full stack developer' }
  ]

  constructor(
    private readonly _userChat:UserChatService,
    private readonly _userAPIs:UserAPIServiceService,
    private readonly _activatedRoute:ActivatedRoute,
    private readonly _userStore:Store<{ user:userStateModel }>
  ) {}

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe({
      next: params => {
        this.receiver_id = params.get('id')
        this.loadChat()
      }
    })

    this._userStore.select(getUserId).subscribe( id => this.user_id = id)

    this._userChat.getUserConnections().subscribe({
      next: res => console.log(res)
    })

    this._userChat.addUser(this.user_id);

    this._userChat.onMessage().subscribe(message => {
      this.messages.push(message);
    });

  }

  loadChat() {
    if (this.receiver_id) {
      const isConnectionExist = this.sampleUser.find((connection) => connection._id == this.receiver_id)
      if (isConnectionExist) {
        this.oppositeUserData = isConnectionExist
      } else {
        this._userAPIs.fetchUserProfileById(this.receiver_id).subscribe({
          next: response => this.oppositeUserData = response.userData
        })
        this.getMessages()
      }
    }
  }

  getMessages() {
    if (this.receiver_id) {
      this._userChat.getMessagesByReceiverId(this.receiver_id).subscribe({
        next: response => this.messages = response.chats
      })
      console.log(this.messages);
      
    }
  }

  sendMessage(): void {
    if (this.message.trim() === '') return;

    if (this.message.trim() && this.receiver_id) {
      const message = {
        sender: this.user_id,
        receiver: this.receiver_id,
        content: this.message,
        createdAt: new Date()
      };
  
      this._userChat.sendMessage(this.user_id, this.receiver_id, this.message, new Date());
      this.messages.push(message);
      this.message = '';
    }
    
  }

  trackByCreated(index: number, message: any): Date {
    return message.createdAt;
  }

}
