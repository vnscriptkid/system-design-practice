## Components

- Database: PostgreSQL
- API server: NodeJS
- Cronjob: NodeJS worker

## TODOS:

- [DONE] Setup api server
- [DONE] Setup database:
  - connect from api,
  - create database, table
- API CRUDs:
  - [DONE] set(key, value, ttl): default ttl, upsert
  - delete(key): -1, reduce disk load
  - get(key): lazy delete400
- Batch clean up using cronjob
- Scale api server:
  - add LB
  - add 2 more api servers
- Scale database using sharding
  - add one more database instance
  - put sharding logic over each api
