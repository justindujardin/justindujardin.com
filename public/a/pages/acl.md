# Application Core Library [![Build Status](https://secure.travis-ci.org/justindujardin/ACL.png?branch=master)](http://travis-ci.org/justindujardin/ACL)
---

### Overview

Application Core Library is a C++ library, from the torque family of game engines, for developing cross-platform applications.  It includes basic cross-platform types and classes for building applications on top of.  

There are three main parts:
  
 - The `core` path contains most of the classes for writing applications that you'll interact with.  
 - The `platform` directory contains an abstracted platform layer, that provides access to OS-specific services (e.g. Threads, FileSystem, Dynamic Libraries).  
 - The `plugin` directory contains a C-interface based plugin system skeleton, to allow compiler independent exporting of functions for use in other libraries.

### Features

- [Compiler independent types](https://github.com/justindujardin/ACL/blob/master/acl/core/types.h)
- [Compiler independent string functions](https://github.com/justindujardin/ACL/blob/master/acl/core/strings/stringFunctions.h)
- [String class](https://github.com/justindujardin/ACL/blob/master/acl/core/strings/str.h) with support for [pointer string comparisons](https://github.com/justindujardin/ACL/blob/master/acl/core/strings/str.h#L166).
- [Path class](https://github.com/justindujardin/ACL/blob/master/acl/core/strings/path.h)
- [Unicode string support](https://github.com/justindujardin/ACL/blob/master/acl/core/strings/unicode.h)
- [Stream classes](https://github.com/justindujardin/ACL/tree/master/acl/core/stream)
- [Container classes](https://github.com/justindujardin/ACL/tree/master/acl/core/containers), e.g. Vector, List, Dictionary, Pair
- [Compiler independent aligned memory allocation functions](https://github.com/justindujardin/ACL/blob/master/acl/core/memoryFunctions.h)
- [Ultra-fast delegates](https://github.com/justindujardin/ACL/blob/master/acl/core/util/delegate.h) and [multi-cast delegates](https://github.com/justindujardin/ACL/blob/master/acl/core/util/tSignal.h)
- [Reference-counted pointer classes](https://github.com/justindujardin/ACL/blob/master/acl/core/util/refBase.h)
- [Type rebinding](https://github.com/justindujardin/ACL/blob/master/acl/core/util/typeRebind.h) for implementation-specific abstracted class creation.
- Various Utilities: [endian conversion](https://github.com/justindujardin/ACL/blob/master/acl/core/util/endian.h), [crc calculation](https://github.com/justindujardin/ACL/blob/master/acl/core/crc.h), [compiler intrinsics](https://github.com/justindujardin/ACL/blob/master/acl/core/intrinsics.h), [compile-time and runtime assertions](https://github.com/justindujardin/ACL/blob/master/acl/core/assert.h), ...

