export type BookType = {
  id?: string;
  title: string;
  author: string;
  description?: string;
  imageUrl?: string;
  isbn?: string;
  googleBookId: string;
  readingStatus?: number;
  isStored?: boolean;
}

export type MemoType = {
  id: string;
  content: string;
  pageNumber: number;
  updatedAt: Date;
}