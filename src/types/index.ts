export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  imageFile?: File;
}

export interface User {
  username: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
}