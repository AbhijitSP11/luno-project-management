import { PasswordStrength } from "@/types/types";
import { checkPasswordStrength } from "@/utils/passwordStrength";
import { Mail, Lock, User } from "lucide-react";
import { useState, useEffect } from "react";

interface ValidationRule {
  check: (value: string) => boolean;
  message: string;
}

interface FormInputProps {
  type: string;
  name: string;
  label: string;
  value: string;
  error?: string;
  validations?: ValidationRule[]; // Add validations prop
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStrengthChange?: (strength: PasswordStrength) => void;
}

export const FormInput = ({
  type,
  name,
  label,
  value,
  error,
  validations = [], // Default to an empty array
  onChange,
  onStrengthChange
}: FormInputProps) => {
  const [strengthTimeout, setStrengthTimeout] = useState<NodeJS.Timeout>();
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const getIcon = () => {
    switch (name) {
      case 'email': return <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />;
      case 'password': return <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />;
      case 'name': return <User className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />;
      default: return null;
    }
  };

  useEffect(() => {
    if (type === 'password' && onStrengthChange) {
      if (strengthTimeout) clearTimeout(strengthTimeout);

      const timeout = setTimeout(() => {
        const strength = checkPasswordStrength(value);
        onStrengthChange(strength);
      }, 200);

      setStrengthTimeout(timeout);
    }

    return () => {
      if (strengthTimeout) clearTimeout(strengthTimeout);
    };
  }, [value]);

  useEffect(() => {
    // Perform validation on value change
    const errors = validations
      .filter((validation) => !validation.check(value)) // Keep only failed checks
      .map((validation) => validation.message); // Extract messages

    setValidationErrors(errors);
  }, [value, validations]);

  return (
    <div className="space-y-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        {getIcon()}
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className={`pl-10 w-full py-2 px-4 bg-white border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all ${
            error ? 'border-red-500' : 'border-gray-200'
          }`}
          placeholder={type === 'password' ? '••••••••' : `Enter your ${label.toLowerCase()}`}
        />
      </div>
      {validationErrors.map((err, idx) => (
        <p key={idx} className="text-red-500 text-sm mt-1">{err}</p>
      ))}
    </div>
  );
};
