export class BlogCreatedMessage {
  authorId: number;
  id: number;
  title: string;
  body: string;
  publishedAt: number;

  constructor(
    authorId: number,
    id: number,
    title: string,
    body: string,
    publishedAt: number
  ) {
    this.authorId = authorId;
    this.id = id;
    this.title = title;
    this.body = body;
    this.publishedAt = publishedAt;
  }

  static create(jsonStr: string) {
    const { authorId, id, title, body, publishedAt } = JSON.parse(jsonStr);

    return new BlogCreatedMessage(
      parseInt(authorId),
      parseInt(id),
      title,
      body,
      publishedAt
    );
  }
}
