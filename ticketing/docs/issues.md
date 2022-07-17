# Issues

```bash
[client] node:internal/crypto/hash:67
[client]   this[kHandle] = new _Hash(algorithm, xofLen);
[client]                   ^
[client]
[client] Error: error:0308010C:digital envelope routines::unsupported
```
- Dockerfile `FROM node:14-alpine`