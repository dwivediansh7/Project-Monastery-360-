
export type Monastery = {
  id: string;
  name: string;
  location: string;
  description: string;
  imageId: string;
  tourImageId: string;
  tourEmbedUrl?: string;
  mapEmbedUrl?: string;
  reviews: Review[];
  guides: TourGuide[];
  activities: Activity[];
  attractions: Attraction[];
  walkthroughs?: Walkthrough[];
};

export type ArchiveDocument = {
  id: string;
  title: string;
  type: 'manuscript' | 'mural' | 'document';
  description: string;
  imageId: string;
  content: string;
  url?: string;
};

export type CulturalEvent = {
  id: string;
  name: string;
  monastery: string;
  date: Date;
  description: string;
  imageId?: string;
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  comment: string;
};

export type TourGuide = {
  id: string;
  name: string;
  rate: string;
  contact: string;
};

export type Activity = {
  id: string;
  name: string;
  description: string;
};

export type Attraction = {
  id: string;
  name: string;
  description: string;
};

export type Walkthrough = {
  language: string;
  videoUrl: string;
};

export type LocalService = {
  id: string;
  name: string;
  type: 'Transport' | 'Tour Agency';
  contact: string;
  description: string;
  rating: number;
};
