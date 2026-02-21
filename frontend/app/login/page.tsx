'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C43.021,36.251,44,30.651,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
  </svg>
);

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isRegistering, setIsRegistering] = useState(false);

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [acceptedDisclaimer, setAcceptedDisclaimer] = useState(false);

  const [error, setError] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);

  const hasGivenConsent =
    acceptedTerms && acceptedPrivacy && acceptedDisclaimer;

  useEffect(() => {
    if (searchParams.get('register') === 'true') {
      setIsRegistering(true);
    }
  }, [searchParams]);

  const handleGoogleSignIn = async () => {
    setError('');

    if (isRegistering && !hasGivenConsent) {
      setError('You must accept all agreements to create an account.');
      return;
    }

    setGoogleLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (err: any) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setError('Failed to sign in with Google. Please try again.');
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  const resetForm = () => {
    setAcceptedTerms(false);
    setAcceptedPrivacy(false);
    setAcceptedDisclaimer(false);
    setError('');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#334155_0.8px,transparent_1px)] [background-size:4px_4px]" />

      <div className="relative z-10 w-full max-w-[400px]">
        <div className="bg-slate-900/95 border border-slate-700/80 rounded-3xl p-9 shadow-2xl">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-white">
              {isRegistering ? 'Create an Account' : 'Welcome Back'}
            </h1>
            <p className="text-slate-400 mt-2 text-sm">
              {isRegistering
                ? 'Sign up with Google to get started'
                : 'Log in with Google to continue'}
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-950/70 border border-red-500/30 text-red-400 px-5 py-3 rounded-2xl text-sm">
              {error}
            </div>
          )}

          {/* Consent Section (Register Mode Only) */}
          {isRegistering && (
            <div className="space-y-4 text-sm text-slate-400 mb-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1 accent-emerald-500 w-4 h-4"
                />
                I accept the{' '}
                <Link href="/terms" className="text-emerald-400 hover:underline">
                  Terms of Service
                </Link>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptedPrivacy}
                  onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                  className="mt-1 accent-emerald-500 w-4 h-4"
                />
                I accept the{' '}
                <Link href="/privacy" className="text-emerald-400 hover:underline">
                  Privacy Policy
                </Link>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptedDisclaimer}
                  onChange={(e) => setAcceptedDisclaimer(e.target.checked)}
                  className="mt-1 accent-emerald-500 w-4 h-4"
                />
                I have read the{' '}
                <Link href="/disclaimer" className="text-emerald-400 hover:underline">
                  Disclaimer
                </Link>
              </label>
            </div>
          )}

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading || (isRegistering && !hasGivenConsent)}
            className="w-full flex items-center justify-center gap-3 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded-2xl py-3.5 text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <GoogleIcon />
            {googleLoading ? 'Redirecting...' : 'Continue with Google'}
          </button>

          {/* Toggle Mode */}
          <div className="text-center mt-8 text-sm">
            <button
              onClick={() => {
                setIsRegistering(!isRegistering);
                resetForm();
              }}
              className="text-emerald-400 hover:text-emerald-300 font-medium"
            >
              {isRegistering
                ? 'Already have an account? Log In'
                : 'Create an Account'}
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 mt-8">
          Secured by Firebase • No credit card required
        </p>
      </div>
    </div>
  );
}