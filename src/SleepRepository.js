import Sleep from '../src/Sleep'

class SleepRepository{
  constructor(data){
    this.sleep = data.map(data => new Sleep(data))   

  }
}

export default SleepRepository
