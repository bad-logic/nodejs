import Semaphore from './semaphore.mjs';

// ################################################################  Round Robin     ##################################################################################################

class RoundRobin {
  semaphores;
  resources;
  cursor = 0;

  constructor(listOfResources, THRESHOLD) {
    this.semaphores = new Array(listOfResources.length).fill(new Semaphore(THRESHOLD));
    this.resources = listOfResources;
  }

  updateCursor() {
    this.cursor = (this.cursor + 1) % this.resources.length;
  }

  getResources() {
    const semaphore = this.semaphores[this.cursor];
    if (semaphore.canLock()) {
      const done = () => {
        this.updateCursor();
        semaphore.unlock();
      };
      return {
        done,
        resource: this.resources[this.cursor],
      };
    } else {
      // get another resources
      throw new Error('limit exceeded with round robin');
    }
  }
}

export default RoundRobin;
