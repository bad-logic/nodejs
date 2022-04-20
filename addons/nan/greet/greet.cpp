#include <nan.h>;

NAN_METHOD(greet){
    auto message = Nan::New("Hello Node from NAN code ").ToLocalChecked();
    info.GetReturnValue().Set(message);
}

NAN_MODULE_INIT(Init){
    NAN_EXPORT(target,greet);
}

NODE_MODULE(Hello, Init);
