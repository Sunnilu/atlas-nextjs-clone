// lib/definitions.ts

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Topic = {
  id: string;
  title: string;
};

export type Question = {
  id: string;
  title: string;
  topic_id: string;
  votes: number;
};

export type Answer = {
  id: string;
  text: string;
  question_id: string;
  accepted: boolean;
  created_at: string;
};
