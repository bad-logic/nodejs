#include <nan.h>

int Run(int cycles);

NAN_METHOD(RunSync){
    int cycles =  info[0]->Int32Value(Nan::GetCurrentContext()).FromJust(); 
    int result = Run(cycles);

    info.GetReturnValue().Set(result);
}