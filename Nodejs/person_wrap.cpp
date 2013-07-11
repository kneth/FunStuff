#include "person_wrap.hpp"
#include "person.hpp"
#include <iostream>
#include <string.h>
using namespace v8;

Persistent<Function> PersonWrap::Constructor;

// Add wrapper class to runtime environment
void PersonWrap::Init(Handle<Object> target) {
    HandleScope scope;

    Local<FunctionTemplate> t = FunctionTemplate::New(New);
    t->SetClassName(String::NewSymbol("Person"));
    t->InstanceTemplate()->SetInternalFieldCount(1);

    NODE_SET_PROTOTYPE_METHOD(t, "toString",   ToString);

    Handle<ObjectTemplate> t_inst = t->InstanceTemplate();
    t_inst->SetNamedPropertyHandler(Getter, Setter);
    target->Set(String::NewSymbol("Person"), t->GetFunction());
    Constructor = Persistent<Function>::New(t->GetFunction());
}

PersonWrap::PersonWrap() : m_person() {}

PersonWrap::~PersonWrap() {}

// Create a new instance of the PersonWrap class
Handle<Value> PersonWrap::New(const Arguments& args) {
    HandleScope scope;

    // constructor take no arguments
    if (args.Length() == 0) {
        PersonWrap* pw = new PersonWrap();
        Person *p      = new Person();
        pw->m_person   = p;
        pw->Wrap(args.This());
        return args.This();
    }
    else if (args.Length() == 1) {
        PersonWrap* pw = new PersonWrap();
        pw->Wrap(args.This());
        return args.This();
    }
    else {
        return ThrowException(Exception::SyntaxError(String::New("Zero or one argument ecpected")));
    }
}

// Create a new instance of the PersonWrap from a book
Handle<Object> PersonWrap::New(Book* b, uint32_t index) {
    HandleScope scope;

    Handle<Value> argv[] = { Boolean::New(true) };
    Handle<Object> obj = Constructor->NewInstance(1, argv);
    PersonWrap* pw = PersonWrap::Unwrap<PersonWrap>(obj);
    Handle<External> person_ptr = External::New(pw);
    pw->m_person = (*b)[size_t(index)];
    obj->SetInternalField(0, person_ptr);
    return scope.Close(obj);
}

// Create a wrapper for a Person object
Handle<Object> PersonWrap::New(Person* p) {
    HandleScope scope;

    Handle<Value> argv[] = { Boolean::New(true) };
    Handle<Object> obj = Constructor->NewInstance(1, argv);
    PersonWrap* pw = PersonWrap::Unwrap<PersonWrap>(obj);
    Handle<External> person_ptr = External::New(pw);
    pw->m_person = p;
    obj->SetInternalField(0, person_ptr);
    return scope.Close(obj);
}

// Get an attribute (firstname, lastname, birthday)
Handle<Value> PersonWrap::Getter(Local<String> name, const AccessorInfo &info) {
    HandleScope scope;
    const PersonWrap* pw = PersonWrap::Unwrap<PersonWrap>(info.This());
    Person *p = pw->m_person;

    // which attribute?
    const String::Utf8Value attr(name);
    if (strcmp(*attr, "firstname") == 0) {
        const string firstname = p->firstname();
        Local<String> s = String::New(firstname.c_str());
        return scope.Close(s);
    }
    else if (strcmp(*attr, "lastname") == 0) {
        const string lastname = p->lastname();
        Local<String> s = String::New(lastname.c_str());
        return scope.Close(s);
    }
    else if (strcmp(*attr, "birthday") == 0) {
        Local<Value> d = Date::New(double(p->birthday()));
        return scope.Close(d);
    }
    else {
        return ThrowException(Exception::RangeError(String::New("Invalid attribute")));
    }
}


// Set an attribute (firstname, lastname, birthday)
Handle<Value> PersonWrap::Setter(Local<String> name, Local<Value> value, const AccessorInfo &info) {
    HandleScope scope;
    PersonWrap *pw = ObjectWrap::Unwrap<PersonWrap>(info.This());
    Person *p = pw->m_person;

    const String::Utf8Value attr(name);
    if (strcmp(*attr, "firstname") == 0) {
        if (value->IsString()) {
            const String::Utf8Value v(value->ToString());
            p->firstname(*v);
        }
        else {
            return ThrowException(Exception::TypeError(String::New("String expected")));
        }
    }
    else if (strcmp(*attr, "lastname") == 0) {
        if (value->IsString()) {
            const String::Utf8Value v(value->ToString());
            p->lastname(*v);
        }
        else {
            return ThrowException(Exception::TypeError(String::New("String expected")));
        }
    }
    else if (strcmp(*attr, "birthday") == 0) {
        if (value->IsDate()) {
            Local<Date> d = Date::Cast(*value);
            p->birthday(time_t(d->NumberValue()));
        }
        else {
            return ThrowException(Exception::TypeError(String::New("Date expected")));
        }
    }
    else {
        return ThrowException(Exception::RangeError(String::New("Invalid attribute")));
    }

    return scope.Close(value);
}

// Convert object to string
Handle<Value> PersonWrap::ToString(const Arguments& args) {
    HandleScope scope;
    if (args.Length() == 0) {
        PersonWrap* pw = ObjectWrap::Unwrap<PersonWrap>(args.This());
        const string s = pw->m_person->to_str();
        cout << "str " << s << endl;
        Handle<String> r = String::New(s.c_str());
        return scope.Close(r);
    }
    else {
        return ThrowException(Exception::SyntaxError(String::New("No arguments expected")));
    }
}
