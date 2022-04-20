#include <node.h>

namespace calculator_module{
    using v8::Exception;
    using v8::FunctionCallbackInfo;
    using v8::Isolate;
    using v8::Local;
    using v8::Number;
    using v8::Object;
    using v8::String;
    using v8::Value;

    void add(const FunctionCallbackInfo<Value>& args){
        Isolate* isolate = args.GetIsolate();

        if(args.Length() < 2){
            isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate,"Must send two arguments to #add").ToLocalChecked()));
            return;
        }

        if(!args[0]->IsNumber() || !args[1]->IsNumber()){
            isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate,"#add only accepts numbers").ToLocalChecked()));
            return;
        }

        double value = args[0].As<Number>()->Value() + args[1].As<Number>()->Value();
        Local<Number> num = Number::New(isolate, value);

        args.GetReturnValue().Set(num);
    }

    void subtract(const FunctionCallbackInfo<Value>& args){
        Isolate* isolate = args.GetIsolate();

        if(args.Length() < 2){
            isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate,"Must send two arguments to #subtract").ToLocalChecked()));
            return;
        }

        if(!args[0]->IsNumber() || !args[1]->IsNumber()){
            isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate,"#subtract only accepts numbers").ToLocalChecked()));
            return;
        }

        double value = args[0].As<Number>()->Value() - args[1].As<Number>()->Value();
        Local<Number> num = Number::New(isolate, value);

        args.GetReturnValue().Set(num);
    }

    void Init(Local<Object> exports){
        NODE_SET_METHOD(exports, "add", add);
        NODE_SET_METHOD(exports, "subtract", subtract);
    }

    NODE_MODULE(NODE_GYP_MODULE_NAME, Init) 
}