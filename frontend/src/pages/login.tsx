
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './login.css';

export default function Login() {
  const { user, loading, signInWithGoogle } = useAuth();
  const [error, setError] = useState('');

  async function handleGoogleSignIn(): Promise<void> {
    setError('');

    try {
      await signInWithGoogle();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Google sign-in failed. Please try again.'
      );
    }
  }

  if (loading) {
    return (
      <div className="login-loading">
        Checking session...
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  
  return (
    <div className="login-container">
      <main className="login-page">
        <div className="login-content">
          <h1>Welcome to DishaAI</h1>
          <p className="login-subtitle">
            Sign in to continue your career journey.
          </p>

          {error && (
            <p role="alert" className="login-error">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="google-sign-in"
          >
            {/* Keep your existing Google SVG here */}
            <span>Continue with Google</span>
          </button>
        </div>
      </main>
    </div>
  );

}
