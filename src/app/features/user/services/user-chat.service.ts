import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserChatService {

  private _socket:any;

  constructor(
    private readonly _http:HttpClient
  ) {
    this._socket = io(environment.serverURL)
  }

  addUser(userId: string): void {
    this._socket.emit('add_user', userId);
  }

  getUserConnections() {
    return this._http.get(environment.baseURL + 'chat/user/get-connections')
  }

  startChat(to: string): void {
    this._socket.emit('chat:started', { to });
  }

  getMessagesByReceiverId(receiver_id: string): Observable<any> {
    return this._http.get(`${environment.baseURL}chat/user/get-messages/${receiver_id}`);
  }

  sendMessage(sender: string, receiver: string, text: string, createdAt: Date): void {
    this._socket.emit('sendMessage', { sender, receiver, text, createdAt });
    this._http.post(environment.baseURL + 'chat/user/save-message', { receiver_id:receiver, content:text }).subscribe()
  }

  onMessage(): Observable<any> {
    return new Observable(observer => {
      this._socket.on('message', (data:any) => {
        console.log('new',data);
        
        observer.next(data);
      });
    });
  }

  endSession(receiver: string): void {
    this._socket.emit('end_session', receiver);
  }

  disconnect(): void {
    this._socket.disconnect();
  }

}
