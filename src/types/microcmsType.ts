export interface MicroCMSImage {
  url: string;
  height?: number;
  width?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}


export interface blogPage {
  id: string;
  eyecatch: MicroCMSImage;
  category: Category;
  slug: string;
  title: string;
  content?: string;
  updatedAt: string;
  createdAt: string;
}