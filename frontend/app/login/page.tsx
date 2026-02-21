'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight 
} from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [acceptedDisclaimer, setAcceptedDisclaimer] = useState(false);

  useEffect(() => {
    if (searchParams.get('register') === 'true') {
      setIsRegistering(true);
    }
  }, [searchParams]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isRegistering) {
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      if (!acceptedTerms || !acceptedPrivacy || !acceptedDisclaimer) {
        setError('You must accept the Terms of Service, Privacy Policy and the Disclaimer.');
        return;
      }
    }

    setLoading(true);

    try {
      if (isRegistering) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const newUser = userCredential.user;

        await setDoc(doc(db, "users", newUser.uid), {
          email: newUser.email,
          tier: 'FREE',
          acceptedTerms: true,
          acceptedPrivacy: true,
          acceptedDisclaimer: true,
          createdAt: serverTimestamp(),
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }

      router.push('/dashboard');
    } catch (err: any) {
      if (err.code === 'auth/invalid-credential') {
        setError('Invalid email or password.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('Email already registered. Please log in.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password must be at least 6 characters.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const signupDisabled = loading || 
    (isRegistering && (!acceptedTerms || !acceptedPrivacy || !acceptedDisclaimer || password !== confirmPassword));

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#334155_0.8px,transparent_1px)] [background-size:4px_4px]" />

      <div className="relative z-10 w-full max-w-[400px]">
        
        <div className="bg-slate-900/95 border border-slate-700/80 rounded-3xl p-9 shadow-2xl">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-white">
              {isRegistering ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-slate-400 mt-2 text-sm">
              {isRegistering 
                ? 'Only email registration is supported in your region' 
                : 'Log in to access your dashboard'}
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-950/70 border border-red-500/30 text-red-400 px-5 py-3 rounded-2xl text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-6">
            
            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-5 top-4.5 w-5 h-5 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-2xl pl-12 py-4 text-white placeholder:text-slate-400 text-[15px]"
                placeholder="Email address"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-5 top-4.5 w-5 h-5 text-slate-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-2xl pl-12 pr-12 py-4 text-white placeholder:text-slate-400 text-[15px]"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-4 text-slate-400 hover:text-slate-300"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Confirm Password - only signup */}
            {isRegistering && (
              <div className="relative">
                <Lock className="absolute left-5 top-4.5 w-5 h-5 text-slate-500" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-2xl pl-12 pr-12 py-4 text-white placeholder:text-slate-400 text-[15px]"
                  placeholder="Confirm password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-5 top-4 text-slate-400 hover:text-slate-300"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            )}

            {/* Consentimiento con links */}
            {isRegistering ? (
              <div className="space-y-3 pt-2 text-sm text-slate-400">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-1 accent-emerald-500 w-4 h-4"
                  />
                  I accept the{' '}
                  <Link href="/terms" className="text-emerald-400 hover:underline">Terms of Service</Link>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={acceptedPrivacy}
                    onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                    className="mt-1 accent-emerald-500 w-4 h-4"
                  />
                  I accept the{' '}
                  <Link href="/privacy" className="text-emerald-400 hover:underline">Privacy Policy</Link>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={acceptedDisclaimer}
                    onChange={(e) => setAcceptedDisclaimer(e.target.checked)}
                    className="mt-1 accent-emerald-500 w-4 h-4"
                  />
                  I have read the{' '}
                  <Link href="/disclaimer" className="text-emerald-400 hover:underline">Disclaimer</Link>
                </label>
              </div>
            ) : (
              <p className="text-sm text-slate-400 text-center pt-1">
                By logging in, you agree to our{' '}
                <Link href="/terms" className="text-emerald-400 hover:underline">Terms of Service</Link> and{' '}
                <Link href="/privacy" className="text-emerald-400 hover:underline">Privacy Policy</Link>.
              </p>
            )}

            {/* Botón grande emerald */}
            <button
              type="submit"
              disabled={signupDisabled}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-400 transition-all py-4 rounded-2xl font-semibold text-base flex items-center justify-center gap-3 shadow-xl shadow-emerald-900/50"
            >
              {loading 
                ? 'Processing...' 
                : isRegistering 
                  ? 'Create Account' 
                  : 'Log In'
              }
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Links inferiores */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 text-sm">
            {!isRegistering && (
              <button 
                onClick={() => {/* ← agrega tu flujo de forgot password aquí */}}
                className="text-emerald-400 hover:text-emerald-300"
              >
                Forgot password?
              </button>
            )}
            
            <button
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError('');
                setConfirmPassword('');
                setAcceptedTerms(false);
                setAcceptedPrivacy(false);
                setAcceptedDisclaimer(false);
              }}
              className="text-emerald-400 hover:text-emerald-300 font-medium"
            >
              {isRegistering 
                ? 'Already have an account? Log in' 
                : 'Create free account'
              }
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