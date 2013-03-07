#define BUILDING_NODE_EXTENSION

#ifndef _PERSON_WRAP_
#define _PERSON_WRAP_

#include <v8.h>
#include <node.h>
#include "person.hpp"
#include "book.hpp"

using namespace node;
using namespace v8;

class PersonWrap : public ObjectWrap {
    friend class BookWrap;
public:
    static void Init(Handle<Object> target);
    static Handle<Value> New(const Arguments& args);
    static Handle<Object> New(Book* n, uint32_t index);
    static Handle<Object> New(Person* p);

    // named getter and setter
    static Handle<Value> Getter(Local<String> name, const AccessorInfo &info);
    static Handle<Value> Setter(Local<String> name, Local<Value> value, const AccessorInfo &info);

    // function wrappers
    static Handle<Value> ToString(const Arguments& args);

    PersonWrap();
    ~PersonWrap();

private:
    Person* m_person;
    static Persistent<Function> Constructor;
};

#endif // _PERSON_WRAP_
