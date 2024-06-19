import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-live-meet',
  templateUrl: './live-meet.component.html',
  styleUrl: './live-meet.component.scss'
})
export class LiveMeetComponent implements OnInit, AfterViewInit{

  domain:string = 'meet.jit.si'
  room:any;
  user:any;
  api:any;
  options:any;

  isAudioMuted:boolean = false
  isVideoMuted:boolean = false

  constructor(
    private readonly _router:Router
  ) {}
 
  ngOnInit(): void {
    this.room = 'Live Meet'
    this.user = {
      name:'Mahroof'
    }
  }

  ngAfterViewInit(): void {
    this.options = {
      roomName: this.room,
      configOverWrite: { proJoinPageEnable:false },
      interfaceConfigOverWrite: {
        TILE_VIEW_MAX_COLUMNS:8
      },parentNode: document.querySelector('#jitsi-iframe'),
      userInfo: {
        displayName:this.user.name
      }
    }

    this.api = new JitsiMeetExternalAPI(this.domain, this.options)
    this.api.addEventListeners({
      readyToClose: this.handleClose,
      participantLeft: this.handleParticipantLeft,
      participantJoined: this.handleParticipantJoined,
      videoConferenceJoined: this.handleVideoConferenceJoined,
      videoConferenceLeft: this.handleVideoConferenceLeft,
      audioMuteStatusChanged: this.handleAudioMuteStatusChanged,
      videoMuteStatusChanged: this.handleVideoMuteStatusChanged
    })
  }

  private handleClose = () => {

  }

  private handleParticipantLeft = async (participant:any) => {
    const data = await this.getParticipants()
  }

  private handleParticipantJoined = async (participant:any) => {
    const data = await this.getParticipants()
  }

  private handleVideoConferenceJoined = async (participant:any) => {
    const data = await this.getParticipants()
  }

  private handleVideoConferenceLeft = async () => {
    // this._router.navigateByUrl('/')
  }

  private handleAudioMuteStatusChanged = () => {
    
  }

  private handleVideoMuteStatusChanged = () => {
    
  }

  getParticipants = () => {
    return new Promise((res, rej) => {
      res(this.api.getParticipantsInfo())
    })
  } 

  executeCommand(command:string) {
    this.api.executeCommand(command)
    if (command == 'hangup') {
      this._router.navigate(['/'])
    } else if (command == 'toggleAudio') {
      this.isAudioMuted = !this.isAudioMuted
    } else if (command == 'toggleVideo') {
      this.isVideoMuted = !this.isVideoMuted
    }
  }

}
