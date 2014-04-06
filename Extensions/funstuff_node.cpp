#ifndef BUILDING_NODE_EXTENSION
#  define BUILDING_NODE_EXTENSION
#endif

#include <node.h>
#include "person_wrap.hpp"
#include "book_wrap.hpp"

extern "C" {
    void init (Handle<Object> target) {
        HandleScope scope;
        PersonWrap::Init(target);
        BookWrap::Init(target);
    }
}

NODE_MODULE(funstuff, init)
