export interface Service {
  id: string;
  title: string;
  description: string[];
  iconName: string;
  colorClass: string;
  containerColor: string;
  delay: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Web' | 'Logo';
  image: string;
  altText: string;
  delay: string;
  techStack?: string[];
  challenge?: string;
  solution?: string;
  client?: string;
  year?: string;
}

export interface Skill {
  id: string;
  name: string;
  percentage: number;
  colorClass: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  colorClass: string;
  delay: string;
}
