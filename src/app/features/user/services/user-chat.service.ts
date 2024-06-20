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

  addUserConnection(connection_id:string, isUser:boolean) {
    return this._http.post(environment.baseURL + 'chat/user/add-connection', { connection_id, isUser })
  }

  addEmployerConnection(connection_id:string) {
    return this._http.post(environment.baseURL + 'chat/employer/add-connection', { connection_id })
  }

  getUserConnections() {
    return this._http.get(`${environment.baseURL}chat/user/get-connections`)
  }

  getEmployerConnections() {
    return this._http.get(environment.baseURL + 'chat/employer/get-connections')
  }

  getUserById(user_id:string) {
    return this._http.get(`${environment.baseURL}chat/employer/get-user?user_id=${user_id}`)
  }

  startChat(to: string): void {
    this._socket.emit('chat:started', { to });
  }

  getUserMessagesByReceiverId(receiver_id: string): Observable<any> {
    return this._http.get(`${environment.baseURL}chat/user/get-messages/${receiver_id}`);
  }

  getEmployerMessagesByReceiverId(receiver_id: string): Observable<any> {
    return this._http.get(`${environment.baseURL}chat/employer/get-messages/${receiver_id}`);
  }

  sendMessageByUser(sender: string, receiver: string, text: string, createdAt: Date, profileType:string): void {
    this._socket.emit('sendMessage', { sender, receiver, text, type:'text', createdAt });
    this._http.post(environment.baseURL + 'chat/user/save-message', { receiver_id:receiver, content:text, profileType }).subscribe()
  }

  sendMessageByEmployer(sender: string, receiver: string, text: string, type:'text' | 'URL', createdAt: Date): void {
    this._socket.emit('sendMessage', { sender, receiver, text, type, createdAt });
    this._http.post(environment.baseURL + 'chat/employer/save-message', { receiver_id:receiver, content:text, type }).subscribe()
  }

  scheduleInterview(receiver_id:string, date:Date, time:string, message_id?:string) {    
    return this._http.post(environment.baseURL + 'chat/employer/schedule-interview', {receiver_id, date, time, message_id})
  }

  cancelScheduledInterview(message_id:string) {
    return this._http.patch(environment.baseURL + 'chat/employer/schedule-interview', {message_id})
  }

  onMessage(): Observable<any> {
    return new Observable(observer => {
      this._socket.on('message', (data:any) => {
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
