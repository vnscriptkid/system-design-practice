## Tecnnologies

- API Server: NodeJS
- CounterService: NodeJS
- Event-Streaming Platform: Kafka
- SearchService: NodeJS/ElasticSearch
- Database: Postgres

## Setup

- Run all services locally:
  - `cd /blogging-platform`
  - `docker-compose up`
- Start API Server:
  - `cd /api-server`
  - `npm start`
- Start CounterService
  - `cd /couter-service`
  - `npm start`

## API Server

- `POST /api/v1/posts`:
  - Create blog post
  - Increment `num_of_blogs` of user synchronously
  - returns success

```json
{
  "userId": 1,
  "title": "title example",
  "body": "body example"
}
```

- `POST /api/v2/posts`:
  - Create blog post
  - Increment `num_of_blogs` of user asynchronously through kafka
  - returns success

## CounterService

- Pull `BlogCreatedMessage` from kafka topic `blog-created`
- Use userId from message value, increment `num_of_blogs` field of this user by one

## SearchService
