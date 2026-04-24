export interface RawDestination {
  id: string;
  price: number;
  days: number;
  image: string;
}

export interface Destination extends RawDestination {
  title: string;
  activity: string;
  location: string;
  shortDescription: string;
  fullDescription: string;
  lodging?: string;
  buttonText: string;
  foodDetails?: string;
  guideDetails?: string;
  highlights: string[];
}

export interface RawCompanyInfo {
  email: string;
  phone: string;
}

export interface RawAppData {
  destinations: RawDestination[];
  company: RawCompanyInfo;
}

export interface AppData {
  destinations: Destination[];
  company: {
    name: string;
    tagline: string;
    email: string;
    phone: string;
  };
}
