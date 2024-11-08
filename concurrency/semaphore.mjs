// ################################################################  SEMAPHORE     ##################################################################################################

class Semaphore {
  threshold;
  counter;

  constructor(threshold) {
    this.threshold = threshold;
    this.counter = 0;
  }

  canLock() {
    return this.counter < this.threshold;
  }

  lock() {
    if (this.counter >= this.threshold) throw new Error('locks exceeded. try again later');
    this.counter++;
  }

  unlock() {
    this.counter--;
  }
}

export default Semaphore;
