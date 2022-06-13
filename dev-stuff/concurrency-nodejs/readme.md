## nodejs concurrency

- concurrency vs parallelism
- process vs thread
- worker process vs worker thread, when to use each?
  - worker threads: light weight, shared data
- event-driven model
- event loops
  - take advantage of event-driven model
  - exists in environment context (browser, nodejs), not JS context
  - technically, a loop (C++), keeps checking: is there any pending event?
    - yes? keeps running
    - no? exit from loop, kill process
  - runs through different phases, each phase handles one kind of events
- callback, promise, async/await
- is JS single-threaded?
  - yes, one process, one thread runs JS code
- is NodeJS single-threaded?
  - no.
  - demonstrate `ps -T -p pid-of-node`
  - v8: threads to manage resources
  - libuv: threadpools for I/O...