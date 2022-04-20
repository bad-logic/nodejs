#include <nan.h>

using v8::Local;
using v8::Number;
using v8::Value;

using namespace Nan;

int Run(int Cycles);

class Worker : public AsyncWorker{
    public:
        Worker(Callback *callback, int cycles) : AsyncWorker(callback),cycles(cycles){}
        ~Worker(){}

        void Execute(){
            result = Run(cycles);
        }

        // Executed when the async work is complete.
        // This function will be run inside the main event loop
        // so it is safe to use V8 again.
        void HandleOKCallback () {
            HandleScope scope;

            Local<Value> argv[] = {
                Null()
            , New<Number>(result)
            };

            callback->Call(2, argv);
        }

    private:
        int cycles;
        int result;
};

NAN_METHOD(RunAsync){
    int cycles = To<int>(info[0]).FromJust();
    Callback *callback = new Callback(To<v8::Function>(info[1]).ToLocalChecked());

    AsyncQueueWorker(new Worker(callback, cycles));
}