export interface ProfileSocials {
  github?: string;
  linkedin?: string;
  instagram?: string;
}

export interface ProfileRow {
  id: number;
  name: string;
  headline: string;
  bio: string;
  photo_url: string;
  email: string;
  whatsapp: string;
  socials: ProfileSocials;
  skills: string[];
  updated_at?: string;
}

export interface ProjectRow {
  id: string;
  title: string;
  description: string;
  image_url: string;
  demo_url: string;
  tech_stack: string[];
  sort_order: number;
  is_published: boolean;
  created_at?: string;
}

export interface ServiceRow {
  id: string;
  name: string;
  price_min: number;
  price_max: number;
  description: string;
  features: string[];
  sort_order: number;
  is_published: boolean;
  created_at?: string;
}
