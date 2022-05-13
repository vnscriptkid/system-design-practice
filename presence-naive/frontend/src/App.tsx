import { useEffect, useState } from "react";
import { postData } from "./utils";

interface Props {
  username?: string | null;
  channel?: string | null;
}

const BASE_URL = `http://localhost:3002/api/v1`;

function UserItem({
  username,
  isOnline,
}: {
  username: string;
  isOnline: boolean;
}) {
  return (
    <div>
      <div className={isOnline ? "online-indicator" : "offline-indicator"}>
        {isOnline && <span className="blink"></span>}
      </div>
      <h2 className="online-text">{username}</h2>
    </div>
  );
}

function App({ username, channel }: Props) {
  const [heartbeats, setHeartbeats] = useState([]);

  useEffect(() => {
    // tell server: i'm online
    const intervalId = setInterval(() => {
      postData(`${BASE_URL}/heartbeats`, {
        username,
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // fetch user's status
    const intervalId = setInterval(() => {
      fetch(`${BASE_URL}/heartbeats`)
        .then((x) => x.json())
        .then((res) => {
          setHeartbeats(res.data);
        });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div>hello {username}</div>
      <div>you are in channel #{channel}</div>
      <div>see who is online/offline</div>
      <div style={{ display: "flex", flexDirection: "column", padding: 20 }}>
        {heartbeats.map((h: any) => (
          <UserItem
            key={h.username}
            username={h.username}
            isOnline={h.isOnline}
          />
        ))}
      </div>
    </>
  );
}

export default App;
