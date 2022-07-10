# Error handling

## Rules
- one microservices returns the same error format in different scenarios:
    - validation errors
    - business logic errors
    - connection errors
    - ...
- all microservices (different tech stack) returns the same error format