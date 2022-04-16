// Reference: https://heynode.com/tutorial/how-event-loop-works-nodejs/
// Reference: https://www.dynatrace.com/news/blog/all-you-need-to-know-to-really-understand-the-node-js-event-loop-and-its-metrics/
// Reference: https://heynode.com/tutorial/explore-immediate-callbacks-phase-nodes-event-loop/
/*

Event loop phases

Event loop is composed of following six phases which are repeated for as long as the application still has
code that needs to be executed, each phases has a queue of events to process.

These six phases create one cycle or loop a.k.a tick.

A nodejs process exits when there is no more pending work in the event loop or when the process.exit() is called manually.
some phases are executed by the event loop itself, but for some of them the main tasks are outsourced to the asynchronous C++ APIs.


 -------------------------------------------------------------------------
|                                                                         |
|              -----------------------------------                        |
|         ---->|             TIMERS              |                        |
|        |     -----------------------------------                        |
|        |                     |                                          |
|        |              nextTickQueue                                     |
|        |                     |                                          |
|        |     -----------------------------------                        |
|        |-----|          I/O CALLBACKS          |                        |
|        |     -----------------------------------                        |
|        |                     |                                          |
|        |              nextTickQueue                                     |
|        |                     |                                          |
|        |     -----------------------------------                        |
|        |-----|        IDLE/PREPARE             |                        |
|        |     -----------------------------------                        |
|        |                     |                                          |
|        |              nextTickQueue                                     |
|        |                     |                                          |
|        |     -----------------------------------                        |
|        |-----|         I/O POLLING             |                        |
|        |     -----------------------------------                        |
|        |                     |                                          |
|        |              nextTickQueue                                     |
|        |                     |                                          |
|        |     -----------------------------------                        |
|        |-----|    setImmediate CALLBACKS       |                        |
|        |     -----------------------------------                        |
|        |                     |                                          |
|        |              nextTickQueue                                     |
|        |                     |                                          |
|        |     -----------------------------------                        |
|         -----|         CLOSE CALLBACKS         |                        |
|              -----------------------------------                        |
|                                                                         |
|                                                                         |
|                                                                         |
 -------------------------------------------------------------------------

TIMERS: Executes callbacks set by using core timers module. E.X: setTimeout, setInterval,...
        This phase is executed directly by the event loop itself meaning the event loop takes the timer with shortest wait time and compares
        with its own (Event's loops) current time. if the wait time has elapsed, timer's callback will be queued to be executed once the call stack
        is empty.

I/O CALLBACKS: Executes I/O callbacks of completed or errored out I/O operations. 
               E.X: readFile, writeFile, readdir, readFileSync, writeFileSync, readdirSync,...

IDLE/PREPARE: It is primarily used for gathering information, and planning of what needs to be executed during the next tick of the Event Loop.

I/O POLLING: JavaScript code that we write is executed. Based on the code it may execute immediately, or it may add something to the queue to be executed 
             during a future tick of the Event Loop.

             NOTE: This phase is optional, If there are any setImmediate() timers scheduled, Node.js will skip this phase 
             during the current tick and move to the setImmediate() phase.

             If there are no functions in the queue, and no timers, the application will wait for callbacks to be added to the queue and execute them 
             immediately, until the internal setTimeout() that is set at the beginning of this phase is up. At that point, it moves on to the next phase. 
             The value of the delay in this timeout also depends on the state of the application.

setImmediate CALLBACK / check phase : Node.js has a special timer, setImmediate(), and its callbacks are executed during this phase. This phase runs as soon as 
                                    the poll phase becomes idle. If setImmediate() is scheduled within the I/O cycle it will always be executed before other timers 
                                    regardless of how many timers are present.

    NOTE: setImmediate() will always be executed before any timers if scheduled within an I/O cycle, regardless of how many other timers are present and their
    elapsed delay time. This differs from when it is set in the "polling" phase, where we don't have any setImmediate() callbacks yet, and the polling timer 
    may not be set to 0. In this case, the delay of other timers may be elapsed prior to the Event Loop moving into the setImmediate() callbacks phase. 
    This, in turn, will lead to those timers' callbacks being executed prior to our setImmediate() callback. setImmediate set in polling phase is hard to predict, 
    may or may not be executed right after the polling phase, this depends on the performance of the process.

CLOSE CALLBACKS: Executes the callbacks of all close events. E.X. process.exit()
                 This is when the Event Loop is wrapping up one cycle and is ready to move to the next one. It is primarily used to clean the state of the 
                 application.

process.nextTick: After the execution of each phase of the event loop, and before starting the next phase of the event loop, there is a nextTickQueue that 
                  is executed but isn’t officially a part of the event loop.
                  Any callback provided in the process.nextTick gets registered in the nextTickQueue of the next phase.
                  As soon as the current phase is completed, the nextTickQueue will be executed before jumping to the next phase of the event loop.

*/
