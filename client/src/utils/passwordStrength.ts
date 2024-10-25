import { PasswordStrength } from "@/types/types";

export const checkPasswordStrength = (password: string): PasswordStrength => {
    const strength: PasswordStrength = {
      score: 0,
      feedback: []
    };
  
    if (password.length < 8) {
      strength.feedback.push("Use at least 8 characters");
    }
    if (!/[A-Z]/.test(password)) {
      strength.feedback.push("Include uppercase letters");
    }
    if (!/[a-z]/.test(password)) {
      strength.feedback.push("Include lowercase letters");
    }
    if (!/[0-9]/.test(password)) {
      strength.feedback.push("Include numbers");
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      strength.feedback.push("Include special characters");
    }
  
    const validCriteria = 5 - strength.feedback.length;
    strength.score = Math.min(Math.max(validCriteria, 0), 4);
  
    return strength;
  };