export class Message {
  senderId: string;
  content: string;
  timestamp: number;
  channelId: string;

  constructor(
    senderId: string,
    content: string,
    timestamp: number,
    channelId: string
  ) {
    this.senderId = senderId;
    this.content = content;
    this.timestamp = timestamp;
    this.channelId = channelId;
  }
}
