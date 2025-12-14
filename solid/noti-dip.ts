import { IMsgStorage, INotifier } from "./interfaces"
import { EmailNotification, MySQLMsgStorage, SMSNotification } from "./repository"

class NitificationDIPService {

  // Dependency Injection by constructor
  constructor(
    private  notifier: INotifier,
    private readonly dbStorage:IMsgStorage
  ){}

  // Dependency Injection by setter method
  setNotifer(n: INotifier){
    this.notifier = n
  }
  sendMessage (msg: string){
    this.notifier.send(msg)
    this.dbStorage.save(msg)
  }
}

// setup dependencies

const smsNotifier = new SMSNotification()
const smsStorage = new MySQLMsgStorage()
const service = new NitificationDIPService(smsNotifier, smsStorage)


// run bussiness
service.sendMessage('helo')

service.setNotifer( new EmailNotification())


service.sendMessage('helo')
