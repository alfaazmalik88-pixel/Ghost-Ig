export interface InstagramProfile {
  username: string;
  name: string;
  avatar: string;
  bio: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
}

export interface InstagramMedia {
  id: string;
  type: "video" | "image" | "carousel";
  url: string;
  thumbnail: string;
  timestamp?: string;
  code?: string;
}

export interface FetchResult {
  success: boolean;
  serverUsed: string;
  profile: InstagramProfile;
  stories: InstagramMedia[];
  posts?: InstagramMedia[];
  highlights?: InstagramMedia[];
  reels?: InstagramMedia[];
  error?: string;
}
