#define BUILDING_NODE_EXTENSION

#ifndef _BOOK_WRAP_
#define _BOOK_WRAP_

#include <v8.h>
#include <node.h>
#include "book.hpp"
#include "person.hpp"

using namespace node;
using namespace v8;

class BookWrap : public ObjectWrap {
public:
    static void Init(Handle<Object> target);
    static Handle<Value> New(const Arguments& args);

    // getter and setter
    static Handle<Value> Getter(uint32_t index, const AccessorInfo &info);
    static Handle<Value> Setter(uint32_t index, Local<Value> value, const AccessorInfo &info);
    static Handle<Boolean> Deleter(uint32_t index, const AccessorInfo &info);
    static Handle<Array> Enumerator(const AccessorInfo &info);


    // function wrappers
    static Handle<Value> Add(const Arguments& args);
    static Handle<Value> Lookup(const Arguments& args);
    static Handle<Value> Length(const Arguments& args);
    static Handle<Value> Each(const Arguments& args);
    static Handle<Value> Apply(const Arguments& args);

    BookWrap();
    ~BookWrap();

private:
    Book* m_book;
    static Persistent<Function> Constructor;
};

#endif // _BOOK_WRAP_
