## ref

- https://www.youtube.com/watch?v=gzIcGhJC8hA
- https://github.com/hnasr/javascript_playground/tree/master/ws-live-chat-system
- https://www.toptal.com/go/going-real-time-with-redis-pubsub
- https://github.com/desertbit/glue
- https://josephmate.github.io/2022-04-14-max-connections/?utm_id=FAUN_VarBear319_Link_title

## TODOS:

- Create a single ws edge-server (nodejs)
- Create a single api server (nodejs,express)
- Setup single database
  - Create tables
  - Connect from ws
- Implement endpoint on api:
  - getMessages(channelId)
- Implement endpoint on edge-server:
  - sendMessage(destChannelId, message)
- Delegate storing new message to kafka
- Add consumer to do the job
- Scale ws servers
  - Add LB
  - Add redis pub/sub
- Shard messages table
- Partition membership table

## redis

- `pubsub channels *`
