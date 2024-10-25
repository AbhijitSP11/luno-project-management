'use client';

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight, ChevronLeft } from "lucide-react";

import { FormData, FormType, PasswordStrength, ValidationError } from "@/types/types";
import { PasswordStrengthIndicator } from "@/components/AuthForms/PasswordStrengthIndicator";
import { FormInput } from "@/components/AuthForms/FormInput";
import { SocialButtons } from "@/components/AuthForms/SocialButtons";
import { Alerts } from "@/components/ui/Alerts";
import { useUpsertUserMutation } from "@/state/api";

export default function AuthForms() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentForm, setCurrentForm] = useState<FormType>('social');
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    name: ''
  });
  const [validationErrors, setValidationErrors] = useState<ValidationError>({});
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    feedback: []
  });
 

  useEffect(() => {
    if (session) router.replace('/dashboard');
  }, [session, router]);

  if (session) return null;
  
  const [upsertUser] = useUpsertUserMutation();

  const passwordValidations = [
    {
      check: (value: string) => value.length >= 8,
      message: 'At least 8 characters'
    },
    {
      check: (value: string) => /[A-Z]/.test(value),
      message: 'One uppercase letter'
    },
    {
      check: (value: string) => /[a-z]/.test(value),
      message: 'One lowercase letter'
    },
    {
      check: (value: string) => /[0-9]/.test(value),
      message: 'One number'
    },
    {
      check: (value: string) => /[^A-Za-z0-9]/.test(value),
      message: 'One special character'
    }
  ];

  const emailValidations = [
    {
      check: (value: string) => /\S+@\S+\.\S+/.test(value),
      message: 'Valid email address'
    }
  ];

  const validateForm = (): boolean => {
    const errors: ValidationError = {};
    
    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    // Name validation (only for signup)
    if (currentForm === 'signup' && (!formData.name || formData.name.trim().length < 2)) {
      errors.name = 'Name must be at least 2 characters';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSocialLogin = async (provider: string) => {
    try {
      setIsLoading(true);
      setError("");
      
      const result = await signIn(provider, { redirect: false, callbackUrl: "/dashboard" });

      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        router.push(result.url || "/");
      }
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
  
    setIsLoading(true);
    setError("");
  
    try {
      if (currentForm === 'signup') {
        const result = await upsertUser({
          email: formData.email,
          password: formData.password,
          name: formData.name
        }).unwrap();
        
        if (result) {
          // After signup, automatically sign in
          const signInResult = await signIn('credentials', {
            email: formData.email,
            password: formData.password,
            redirect: false,
          });
          if (signInResult?.ok) router.push("/dashboard");
        }
      } else {
        const result = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });
        if (result?.ok) router.push("/dashboard");
        else setError(result?.error || "Login failed");
      }
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setValidationErrors(prev => ({ ...prev, [name]: undefined }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative w-full max-w-md mx-4">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 space-y-6">
          {/* Logo and Title */}
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-white">A</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {currentForm === 'signup' ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="mt-2 text-gray-600">
              {currentForm === 'signup' ? 'Sign up to get started' : 'Sign in to manage your projects'}
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <Alerts
              type="error"
              message={error}
              isVisible={!!error}
              onClose={() => setError('')}
            />
          )}
           {currentForm !== 'social' && (
              <button
                onClick={() => setCurrentForm('social')}
                className="text-sm text-gray-500 hover:underline flex items-center"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Go back to social login
              </button>
            )}
          {currentForm === 'social' ? (
            <>
              <SocialButtons
                onSocialLogin={handleSocialLogin}
                isLoading={isLoading}
              />
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {currentForm === 'signup' && (
                <FormInput
                  type="text"
                  name="name"
                  label="Full Name"
                  value={formData.name || ''}
                  error={validationErrors.name}
                  onChange={handleInputChange}
                  validations={[
                    {
                      check: (value: string) => value.length >= 2,
                      message: 'At least 2 characters'
                    }
                  ]}
                />
              )}

              <FormInput
                type="email"
                name="email"
                label="Email address"
                value={formData.email}
                error={validationErrors.email}
                onChange={handleInputChange}
                validations={emailValidations}
              />

              <FormInput
                type="password"
                name="password"
                label="Password"
                value={formData.password}
                error={validationErrors.password}
                onChange={handleInputChange}
                onStrengthChange={setPasswordStrength}
                validations={passwordValidations}
              />
              
              {/* Password strength indicator */}
              <PasswordStrengthIndicator strength={passwordStrength} />

              <button
                type="submit"
                className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="animate-spin w-5 h-5 mx-auto" /> : 'Submit'}
              </button>
            </form>
          )}

          <div className="text-center">
            <button
              onClick={() => setCurrentForm(currentForm === 'signup' ? 'signin' : 'signup')}
              className="text-sm text-gray-500 hover:underline"
            >
              {currentForm === 'signup' ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
