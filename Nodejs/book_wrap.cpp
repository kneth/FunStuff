#include "book_wrap.hpp"
#include "person_wrap.hpp"
#include "book.hpp"
#include <iostream>
using namespace v8;

Persistent<Function> BookWrap::Constructor;

// Add wrapper class to runtime environment
void BookWrap::Init(Handle<Object> target) {
    HandleScope scope;

    Local<FunctionTemplate> t = FunctionTemplate::New(New);
    t->SetClassName(String::NewSymbol("Book"));
    t->InstanceTemplate()->SetInternalFieldCount(1);

    NODE_SET_PROTOTYPE_METHOD(t, "add",      Add);
    NODE_SET_PROTOTYPE_METHOD(t, "length",   Length);
    NODE_SET_PROTOTYPE_METHOD(t, "lookup",   Lookup);
    NODE_SET_PROTOTYPE_METHOD(t, "each",     Each);
    NODE_SET_PROTOTYPE_METHOD(t, "apply",    Apply);

    Handle<ObjectTemplate> t_inst = t->InstanceTemplate();
    t_inst->SetIndexedPropertyHandler(Getter, Setter, 0, Deleter, Enumerator);
    target->Set(String::NewSymbol("Book"), t->GetFunction());
    Constructor = Persistent<Function>::New(t->GetFunction());
}

BookWrap::BookWrap() : m_book() {}

BookWrap::~BookWrap() {}

// Create a new instance of the PersonWrap class
Handle<Value> BookWrap::New(const Arguments& args) {
    HandleScope scope;

    // constructor take no arguments
    if (args.Length() == 0) {
        BookWrap* bw = new BookWrap();
        Book *p      = new Book();
        bw->m_book   = p;
        bw->Wrap(args.This());
        return args.This();
    }
    else {
        return ThrowException(Exception::SyntaxError(String::New("No arguments ecpected")));
    }
}

Handle<Value> BookWrap::Getter(uint32_t index, const AccessorInfo &info) {
    HandleScope scope;
    BookWrap* bw = ObjectWrap::Unwrap<BookWrap>(info.This());
    Book*     b  = bw->m_book;

    if (index >= b->size()) {
        return ThrowException(Exception::RangeError(String::New("invalid row index")));
    }
    Handle<Object> result = PersonWrap::New(b, index);
    return scope.Close(result);
}

Handle<Value> BookWrap::Setter(uint32_t index, Local<Value> value, const AccessorInfo &info) {
    HandleScope scope;
    BookWrap* bw = ObjectWrap::Unwrap<BookWrap>(info.This());
    Book*     b  = bw->m_book;

    if (value->IsArray()) {
        if (index < b->size()) {
            Local<v8::Array> arr = v8::Array::Cast(*value);
            if (arr->Length() == 3) {
                const String::Utf8Value firstname(arr->Get(0)->ToString());
                const String::Utf8Value lastname(arr->Get(1)->ToString());
                Local<v8::Date> date = v8::Date::Cast(*arr->Get(2));
                time_t birthday = (time_t)date->NumberValue();
                Person *p = (*b)[index];
                p->firstname(*firstname);
                p->lastname(*lastname);
                p->birthday(birthday);
            }
            else {
                return ThrowException(Exception::TypeError(String::New("Three elements expected")));                
            }
        }
        if (index == b->size()) {
            Local<v8::Array> arr = v8::Array::Cast(*value);
            if (arr->Length() == 3) {
                const String::Utf8Value firstname(arr->Get(0)->ToString());
                const String::Utf8Value lastname(arr->Get(1)->ToString());
                Local<v8::Date> date = v8::Date::Cast(*arr->Get(2));
                time_t birthday = (time_t)date->NumberValue();
                Person *p = new Person();
                p->firstname(*firstname);
                p->lastname(*lastname);
                p->birthday(birthday);
                b->add(p);
            }
            else {
                return ThrowException(Exception::TypeError(String::New("Three elements expected")));                
            }
        }
        else {
            return ThrowException(Exception::RangeError(String::New("Invalid index")));
        }
    }
    else {
        return ThrowException(Exception::TypeError(String::New("Object expected")));
    }
    return Undefined();
}

Handle<Boolean> BookWrap::Deleter(uint32_t index, const AccessorInfo &info) {
    HandleScope scope;
    Book* b = ObjectWrap::Unwrap<BookWrap>(info.This())->m_book;
    try {
        b->remove(index);
        return scope.Close(True());
    }
    catch (Exception e) {
        return scope.Close(False());
    }
}

Handle<v8::Array> BookWrap::Enumerator(const AccessorInfo &info) {
    HandleScope scope;
    Book* b = ObjectWrap::Unwrap<BookWrap>(info.This())->m_book;

    Handle<v8::Array> result = v8::Array::New(b->size());
    for(size_t i=0; i<b->size(); ++i) {
        result->Set(i, Integer::New(i));
    }
    return scope.Close(result);
}


Handle<Value> BookWrap::Length(const Arguments& args) {
    HandleScope scope;

    BookWrap* bw = ObjectWrap::Unwrap<BookWrap>(args.This());
    const int count = bw->m_book->size();
    Local<Integer> result = Integer::New(count);
    return scope.Close(result);
}


Handle<Value> BookWrap::Each(const Arguments& args) {
    HandleScope scope;
    BookWrap* bw = ObjectWrap::Unwrap<BookWrap>(args.This());
    Book* b      = bw->m_book;
    Local<Function> fun = Local<Function>::Cast(args[0]);
    for(uint32_t i=0; i<b->size(); ++i) {
        Handle<Value> argv[] = { PersonWrap::New(b, i) };
        fun->Call(Context::GetCurrent()->Global(), 1, argv);
    }
    return Undefined();
}

Handle<Value> BookWrap::Apply(const Arguments& args) {
    HandleScope scope;
    Local<Function> fun = Local<Function>::Cast(args[0]);
    Handle<Value> argv[] = { args.This() };
    TryCatch trycatch;
    Handle<Value> v = fun->Call(Context::GetCurrent()->Global(), 1, argv);
    if (trycatch.HasCaught()) {
        trycatch.ReThrow();
    }
    return scope.Close(v);
}


Handle<Value> BookWrap::Add(const Arguments& args) {
    HandleScope scope;

    if (args.Length() == 1) {
        BookWrap* bw = ObjectWrap::Unwrap<BookWrap>(args.This());
        Book* b      = bw->m_book;
        PersonWrap* pw = ObjectWrap::Unwrap<PersonWrap>(args[0]->ToObject());
        b->add(pw->m_person);
    }
    else {
        return ThrowException(Exception::TypeError(String::New("Object expected")));
    }
    return Undefined();
}


Handle<Value> BookWrap::Lookup(const Arguments& args) {
    HandleScope scope;
    if (args.Length() == 1) {
        if (args[0]->IsString()) {
            const String::Utf8Value s(args[0]->ToString());
            Book* b = ObjectWrap::Unwrap<BookWrap>(args.This())->m_book;
            try {
                Person* p = b->lookup(*s);
                return scope.Close(PersonWrap::New(p));
            }
            catch (...) {
                return ThrowException(Exception::RangeError(String::New("Not found")));
            }
        }
        else {
            return ThrowException(Exception::TypeError(String::New("String expected")));
        }
    }
    return Undefined();
}
