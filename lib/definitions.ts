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

export type Vote = {
  id: string;
  user_id: string;
  question_id: string;
  value: number; // 1 for upvote, -1 for downvote
};

export type UserSession = {
  userId: string;
  token: string;
  expires: Date;
};
export type Pagination<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: number | null;
  previousPage: number | null;
};
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  statusCode?: number;
  pagination?: Pagination<T>;
  meta?: Record<string, any>;
  warnings?: string[];
  debugInfo?: {
    requestId?: string;
    timestamp?: string;
    traceId?: string;
  };
  validationErrors?: Record<string, string[]>;
  rateLimit?: {
    limit: number;
    remaining: number;
    reset: number;
  };
  headers?: Record<string, string>;
  cacheControl?: {
    maxAge: number;
    sMaxAge?: number;
    mustRevalidate?: boolean;
    noCache?: boolean;
    noStore?: boolean;
    private?: boolean;
    public?: boolean;
    staleWhileRevalidate?: number;
    staleIfError?: number;
  };
  links?: {
    self: string;
    next?: string;
    previous?: string;
  };
  errors?: {
    code: string;
    message: string;
    details?: string[];
    field?: string;
    status?: number;
  };
  metadata?: Record<string, any>;
  debug?: {
    requestId?: string;
    timestamp?: string;
    traceId?: string;
    additionalInfo?: Record<string, any>;
  };
}
