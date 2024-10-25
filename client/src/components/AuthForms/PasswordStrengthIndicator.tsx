import { PasswordStrength } from "@/types/types";

interface PasswordStrengthIndicatorProps {
    strength: PasswordStrength;
  }
  
  export const PasswordStrengthIndicator = ({ strength }: PasswordStrengthIndicatorProps) => {
    
    const getStrengthColor = () => {
      switch (strength.score) {
        case 0: return 'bg-red-500';
        case 1: return 'bg-orange-500';
        case 2: return 'bg-yellow-500';
        case 3: return 'bg-blue-500';
        case 4: return 'bg-green-500';
        default: return 'bg-gray-200';
      }
    };
  
    const getStrengthText = () => {
      switch (strength.score) {
        case 0: return 'Very Weak';
        case 1: return 'Weak';
        case 2: return 'Fair';
        case 3: return 'Good';
        case 4: return 'Strong';
        default: return 'No Password';
      }
    };
  
    return (
      <div className="mt-2 space-y-2">
        <div className="flex gap-2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full transition-colors ${
                i < strength.score ? getStrengthColor() : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className={`font-medium ${getStrengthColor().replace('bg-', 'text-')}`}>
            {getStrengthText()}
          </span>
          {strength.feedback.length > 0 && (
            <div className="text-gray-500">
              <ul className="list-disc pl-5 text-xs">
                {strength.feedback.map((feedback, index) => (
                  <li key={index}>{feedback}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  };
  