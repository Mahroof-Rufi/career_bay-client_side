import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserChatService } from '../../../features/user/services/user-chat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User, userStateModel } from '../../../features/user/user-store/user.model';
import { Store } from '@ngrx/store';
import { getUserId } from '../../../features/user/user-store/user.selector';
import { UserAPIServiceService } from '../../../features/user/services/user-api-service.service';
import { Chat } from '../../../models/chat';
import { EmployerState } from '../../../features/company/store/employer.model';
import { getEmployerId } from '../../../features/company/store/employer.selector';
import { EmployerApiServiceService } from '../../../features/company/services/employer-api-service.service';
import { initFlowbite } from 'flowbite';
import { InterviewScheduleModalService } from '../../../features/company/services/interview-schedule-modal.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.scss'
})
export class InboxComponent implements OnInit, AfterViewInit{
  
  context!:string;
  profileType: string = 'Users'
  user_id!:string;
  receiver_id:string | null = null;
  oppositeUserData!:User | any; 

  connections: any;
  messages: Chat[] = []

  message:string = ''
  isOpen:boolean = false

  constructor(
    private readonly _userChat:UserChatService,
    private readonly _userAPIs:UserAPIServiceService,
    private readonly _employerAPIs:EmployerApiServiceService,
    private readonly _activatedRoute:ActivatedRoute,
    private readonly _router:Router,
    private readonly _userStore:Store<{ user:userStateModel }>,
    private readonly _employerStore:Store<{ employer:EmployerState }>,
    private readonly _interviewScheduleModal:InterviewScheduleModalService
  ) {}

  ngOnInit(): void {
    this._activatedRoute.queryParamMap.subscribe({
      next: queries => {
        const profileTypeQuery = queries.get('profileType')
        if (profileTypeQuery) {
          this.profileType = profileTypeQuery          
          this.getConnections()
        }
      }
    })

    this._activatedRoute.paramMap.subscribe({
      next: params => {
        const receiver_id = params.get('id')
        const context = params.get('context')
        if (context) this.context = context
        if (receiver_id) {
          this.receiver_id = receiver_id        
          this.loadChat()
        }
      }
    })

    if (this.context == 'user') {
      this._userStore.select(getUserId).subscribe( id => {
        this.user_id = id
        this._userChat.addUser(this.user_id);
      })
    } else if (this.context == 'employer') {
      this._employerStore.select(getEmployerId).subscribe( id => {
        this.user_id = id
        this._userChat.addUser(this.user_id)
      })
    }

    this._userChat.onMessage().subscribe(message => {
      this.messages.push(message);
    });

    this.getConnections()
  }

  ngAfterViewInit(): void {
    initFlowbite()
  }

  loadChat() {
    if (this.context == 'user' && this.receiver_id) {
      const isConnectionExist = this.connections?.connections?.users?.find((connection:any) => connection._id == this.receiver_id)
      if (isConnectionExist) {
        this.oppositeUserData = isConnectionExist
        this.getMessages()
      } else {
        if (this.profileType == 'Users') {
          this._userAPIs.fetchUserProfileById(this.receiver_id).subscribe({
            next: response => {
              this.oppositeUserData = response.userData
              this.getMessages()
            }
          })
        } else if (this.profileType == 'Employers') {
          this._userAPIs.fetchEmployerProfileById(this.receiver_id).subscribe({
            next: response => {
              this.oppositeUserData = response.employerData 
              this.getMessages()
            }
          })
        }
      }
    } else if (this.context == 'employer' && this.receiver_id) {
      const isConnectionExist = this.connections?.connections?.users?.find((connection:any) => connection._id == this.receiver_id)
      if (isConnectionExist) {
        this.oppositeUserData = isConnectionExist
        this.getMessages()
      } else {
        this._userChat.getUserById(this.receiver_id).subscribe({
          next: (response:any) => {
            this.oppositeUserData = response.userData
            this.getMessages()
          }
        })
      }      
    }
  }

  getConnections() {
    if (this.context == 'user') {
      this.getUserConnections()
    } else if (this.context == 'employer') {
      this.getEmployerConnections()
    }
  }

  getUserConnections() {
    this._userChat.getUserConnections().subscribe({
      next: (res:any) => this.connections = res.connections
    })
  }

  getEmployerConnections() {
    this._userChat.getEmployerConnections().subscribe({
      next: (res:any) => this.connections = res.connections
    })
  }

  getMessages() {
    if (this.receiver_id && this.context == 'user') {
      this._userChat.getUserMessagesByReceiverId(this.receiver_id).subscribe({
        next: response => {          
          this.messages = response.chats
        }
      })      
    } else if (this.receiver_id && this.context == 'employer') {
      this._userChat.getEmployerMessagesByReceiverId(this.receiver_id).subscribe({
        next: response => {          
          this.messages = response.chats
        }
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
  
      if (this.context == 'user') {
        this._userChat.sendMessageByUser(this.user_id, this.receiver_id, this.message, new Date(), this.profileType);
      } else if (this.context == 'employer') {
        this._userChat.sendMessageByEmployer(this.user_id, this.receiver_id, this.message, new Date(), this.profileType);
      }
      this.message = '';      
      if (this.messages.length == 0) {        
        if (this.context == 'user') {
          console.log('user coo');
          
          this._userChat.addUserConnection(this.receiver_id, this.profileType === 'Users').subscribe({
            next: (response:any) => this.connections = response.connections
          })
        } else if (this.context == 'employer') {
          console.log('employer coo');
          this._userChat.addEmployerConnection(this.receiver_id).subscribe({
            next: (response:any) => this.connections = response.connections
          })
        }
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

  showOptions() {
    this.isOpen = !this.isOpen
  }

  openInterviewScheduleModal() {
    if (this.receiver_id) {
      this._interviewScheduleModal.openInterviewScheduleModal(this.receiver_id)
    }
  }

}
