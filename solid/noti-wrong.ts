class NitificationService {
  private readonly dbStorage: msgStorage = new msgStorage()
  constructor(
    private readonly type: 'sms' | 'email'
  ){}

  sendMessage (msg: string){
    if( this.type ==='sms'){
      //complex code for sending sms code
      //import SMS gateway, config then send msg
      console.log('sms');
    }
    else{
      //complex code for sending EMAIL code
      //import EMAIL gateway, config then send msg
      console.log('emal');
    }

    this.dbStorage.save(msg)
  }
}

class msgStorage {
  save( msg: string): string {
    return 'save'
  }
}