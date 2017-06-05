/**
 * Created by marcofalsitta on 04.06.17.
 */

import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

export enum ObservableType {
  WEB_SOCKET = 1,
  WEB_SOCKET_MESSAGE_SENDING,
  WEB_SOCKET_MESSAGE_RECEIVED,
  HTTP_SERVICE_RESPONSE,
  HTTP_SERVICE_REQUEST,
  HTTP_SERVICE_ERROR,
  UI_CHANGES,
  CONNECTION_CHANGES
}

@Injectable()
export class MessageService {
  private subject = new Subject<any>();
  private subject_httpServiceResponse = new Subject<any>();
  private subscription_httpServicesRequest = new Subject<any>();
  private subscription_httpServicesError = new Subject<any>();

  private uiMessageSubject = new Subject<any>();
  private connectionChangesObserver = new Subject<any>();

  private wsMessageEmitter = new Subject<any>();
  private wsMessageSendEmitter = new Subject<any>();
  private wsReceivedMessageEmitter = new Subject<any>();

  sendMessage(message: any) {
    this.subject.next(message);
  }

  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  // getSubscriptions(types:ObservableType[]): Observable<any>[]{
  //
  //   let subscriptions:Observable<any>[] = [];
  //
  //   for(let type of types){
  //     let subscription = this.getObservableByType(type);
  //     if(subscription){
  //       subscriptions.push(subscription);
  //     }
  //   }
  //   return subscriptions;
  // }

  /**
   * request a specific subscription type
   * @param type
   * @returns {null}
   */
  getSubscription(type:ObservableType): Observable<any>{
    return this.getObservableByType(type);
  }

  private getObservableByType(type:ObservableType){
    let observable = null;
    switch(type){

      case ObservableType.HTTP_SERVICE_RESPONSE:{
        observable = this.subject_httpServiceResponse.asObservable();
      }break;

      case ObservableType.HTTP_SERVICE_REQUEST:{
        observable = this.subscription_httpServicesRequest.asObservable();
      }break;

      case ObservableType.HTTP_SERVICE_ERROR:{
        observable = this.subscription_httpServicesError.asObservable();
      }break;

      case ObservableType.WEB_SOCKET:{
        observable = this.wsMessageEmitter.asObservable();
      }break;

      case ObservableType.WEB_SOCKET_MESSAGE_SENDING:{
        observable = this.wsMessageSendEmitter.asObservable();
      }break;

      case ObservableType.WEB_SOCKET_MESSAGE_RECEIVED:{
        observable = this.wsReceivedMessageEmitter.asObservable();
      }break;

      case ObservableType.UI_CHANGES:{
        observable = this.uiMessageSubject.asObservable();
      }break;

      case ObservableType.CONNECTION_CHANGES:{
        observable = this.connectionChangesObserver.asObservable();
      }break;


      default:{
        console.error("default case triggered");
        observable = this.subject.asObservable();
      }break;

    }
    return observable;
  }

  dispatchUiMessage(msg){
    this.uiMessageSubject.next(msg);
  }

  broadcastConnectionChangesEvent(msg){
    this.connectionChangesObserver.next(msg);
  }


  dispatchHttpServiceResponse(msg){
    console.log(msg);
    this.subject_httpServiceResponse.next(msg);
  }

  dispatchHttpServiceRequest(msg){
    console.log(msg);
    this.subscription_httpServicesRequest.next(msg);
  }

  dispatchHttpServiceError(msg){
    console.log(msg);
    this.subscription_httpServicesError.next(msg);
  }

  dispatchWSSendMsg(webSocketMsg){
    console.log("**", webSocketMsg);
    this.wsMessageSendEmitter.next(webSocketMsg);
  }




}
