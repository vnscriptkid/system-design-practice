## Components

- Database: PostgreSQL
- API server: NodeJS
- Cronjob: NodeJS worker

## TODOS:

- [DONE] Setup api server
- [DONE] Setup database:
  - connect from api,
  - create database, table
- [DONE] API CRUDs:
  - [DONE] set(key, value, ttl): default ttl, upsert
  - [DONE] delete(key): -1, reduce disk load
  - [DONE] get(key): lazy delete
- [DONE] Batch clean up using cronjob
- [DONE] Scale api server:
  - add LB
  - add 2 more api servers
- [DONE] Scale database using sharding
  - add one more database instance
  - put sharding logic over each api
