export interface User {
  id: string;
  email: string;
  password: string;
  type: 'professional' | 'company';
  createdAt: string;
}

export interface Professional {
  id: string;
  userId: string;
  name: string;
  headline: string;
  bio: string;
  skills: string[];
  level: 'Júnior' | 'Pleno' | 'Sênior';
  location: string;
  availability: 'Disponível' | 'Ocupado' | 'Procurando Oportunidades';
  portfolio?: string;
  website?: string;
  linkedin?: string;
  email?: string;
  phone?: string;
  photo?: string;
}

export interface Opportunity {
  id: string;
  userId: string;
  companyName: string;
  title: string;
  contractType: 'PJ' | 'CLT' | 'Freelancer';
  level: 'Júnior' | 'Pleno' | 'Sênior';
  workType: 'Presencial' | 'Remoto' | 'Híbrido';
  budgetRange?: string;
  description: string;
  requiredSkills: string[];
  location: string;
  contactEmail?: string;
  contactPhone?: string;
  companyWebsite?: string;
  logo?: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, type: 'professional' | 'company') => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}