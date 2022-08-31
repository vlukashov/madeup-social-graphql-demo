export type Channel = {
  channelId: string;
  name: string;
};

export type User = {
  avatar: string;
  firstname: string;
  lastname: string;
  userId: string;
  country?: string;
};

export type Notification = {
  notificationId: string;
  reaction: Reaction;
  seen: Boolean;
  user: User;
};

export type Post = {
  author: User;
  channel: Channel;
  contentShort: string;
  postId: string;
  thumbnail: string;
};

export type Reaction = {
  createdAt: string;
  givenBy: User;
  post: Post;
  reaction: string;
  reactionId: string;
};
