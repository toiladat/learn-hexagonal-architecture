import { IMsgStorage, INotifier } from "../interfaces";

export class SMSNotification implements INotifier {
  send(msg:string) :void {
    //complex code for sending sms code
    //import SMS gateway, config then send msg
    console.log('send with sms', msg);
  }
}

export class EmailNotification implements INotifier {
  send(msg:string) :void {
    //complex code for sending email code
    //import email gateway, config then send msg
    console.log('send with email', msg);
  }
}

export class MySQLMsgStorage implements IMsgStorage{
  save(msg: string): string {
    console.log('save: ', msg);
    return 'save success'
  }

}