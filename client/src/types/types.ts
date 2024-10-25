export type FormType = 'signin' | 'signup' | 'social';

export interface FormData {
  email: string;
  password: string;
  name?: string;
}

export interface ValidationError {
  email?: string;
  password?: string;
  name?: string;
}

export interface PasswordStrength {
  score: number;
  feedback: string[];
}
