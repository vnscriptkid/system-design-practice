## ref

- https://www.youtube.com/watch?v=gzIcGhJC8hA
- https://github.com/hnasr/javascript_playground/tree/master/ws-live-chat-system
- https://www.toptal.com/go/going-real-time-with-redis-pubsub
- https://github.com/desertbit/glue
- https://josephmate.github.io/2022-04-14-max-connections/?utm_id=FAUN_VarBear319_Link_title
- https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers
- https://socket.io/get-started/private-messaging-part-4/

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
- `pubsub numsub channel-5`

## Message flow

- `userA` opens slack, he gets connected to `edge-server-1` through ws
- `userA` joins `channelX`, `edge-server-1` subscribes to `channel-x` channel of redis
- `userB` opens slack, he gets connected to `edge-server-2` through ws
- `userB` joins `channelX`, `edge-server-2` subscribes to `channel-x` channel of redis
- `userA` sends a msg to `channelX`,
  - msg is sent to `edge-server-1`,
  - `edge-server-1` as a redis publisher, publishes msg over `channel-x` channel of redis
  - redis receives msg over `channel-x` channel, it then broadcasts to all subscribers of this channel including `edge-server-1`, `edge-server-2`
- `edge-server-2` as a subscriber, receives msg from redis
  - it looks at the destination `channel-x`
  - it looks up on DB to find who are members of this channel
  - it loops through all members, check if any user is connecting to it by local map `userIdToSocket`
  - if found, it sends the msg over the socket

## more todos:

- clone 2 edge-server running on diff ports
- setup a haproxy LB in front of 2 edge-servers, use round-robin algo
