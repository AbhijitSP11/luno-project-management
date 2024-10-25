import { Github, Mail, Loader2 } from "lucide-react";

interface SocialButtonsProps {
  onSocialLogin: (provider: string) => Promise<void>;
  isLoading: boolean;
}

export const SocialButtons = ({ onSocialLogin, isLoading }: SocialButtonsProps) => (
  <div className="space-y-4">
    <button
      onClick={() => onSocialLogin("github")}
      disabled={isLoading}
      className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-gray-900 hover:bg-gray-800 text-white rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Github className="w-5 h-5" />
      )}
      Continue with GitHub
    </button>

    <button
      onClick={() => onSocialLogin("google")}
      disabled={isLoading}
      className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-600 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Mail className="w-5 h-5" />
      )}
      Continue with Google
    </button>
  </div>
);