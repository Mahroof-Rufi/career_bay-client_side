import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, userStateModel } from '../../../features/user/user-store/user.model';
import { Store } from '@ngrx/store';
import { getUserData } from '../../../features/user/user-store/user.selector';
declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-live-meet',
  templateUrl: './live-meet.component.html',
  styleUrls: ['./live-meet.component.scss']
})
export class LiveMeetComponent implements OnInit, AfterViewInit {

  userData!:User;

  domain: string = '8x8.vc';
  room!: string;
  user: any;
  api: any;
  options: any;

  isAudioMuted: boolean = false;
  isVideoMuted: boolean = false;

  constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _userStore: Store<{ user:userStateModel }>
  ) {}

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe({
      next: params => {
        const user_id = params.get('id')
        if (user_id) {
          this.getUserData()
        }
      }
    })
    this.room = 'vpaas-magic-cookie-13469734af784799a76d295b90f72e84/SampleAppHopefulEggsPrepareEventually';
    this.user = {
      name: this.userData.firstName + this.userData.lastName
    };
  }

  ngAfterViewInit(): void {

    this.options = {
      roomName: this.room,
      configOverwrite: { preJoinPageEnabled: false },
      interfaceConfigOverwrite: {
        TILE_VIEW_MAX_COLUMNS: 8
      },
      parentNode: document.querySelector('#jaas-container'),
      userInfo: {
        displayName: this.user.name
      },
    };

    this.api = new JitsiMeetExternalAPI(this.domain, this.options);
    this.api.addEventListeners({
      readyToClose: this.handleClose,
      participantLeft: this.handleParticipantLeft,
      participantJoined: this.handleParticipantJoined,
      videoConferenceJoined: this.handleVideoConferenceJoined,
      videoConferenceLeft: this.handleVideoConferenceLeft,
      audioMuteStatusChanged: this.handleAudioMuteStatusChanged,
      videoMuteStatusChanged: this.handleVideoMuteStatusChanged,
    });
  }

  private handleClose = () => {
    // Handle meeting close
  }

  private handleParticipantLeft = async (participant: any) => {
    const data = await this.getParticipants();
  }

  private handleParticipantJoined = async (participant: any) => {
    const data = await this.getParticipants();
  }

  private handleVideoConferenceJoined = async (participant: any) => {
    const data = await this.getParticipants();
  }

  private handleVideoConferenceLeft = async () => {
    // Navigate away on conference left
    // this._router.navigateByUrl('/');
  }

  private handleAudioMuteStatusChanged = () => {
    // Handle audio mute status change
  }

  private handleVideoMuteStatusChanged = () => {
    // Handle video mute status change
  }

  getUserData() {
    this._userStore.select(getUserData).subscribe({
      next: user => this.userData = user
    })
  }

  getParticipants = () => {
    return new Promise((res, rej) => {
      res(this.api.getParticipantsInfo());
    });
  }

  executeCommand(command: string) {
    this.api.executeCommand(command);
    if (command === 'hangup') {
      this._router.navigate(['/']);
    } else if (command === 'toggleAudio') {
      this.isAudioMuted = !this.isAudioMuted;
    } else if (command === 'toggleVideo') {
      this.isVideoMuted = !this.isVideoMuted;
    }
  }
}
