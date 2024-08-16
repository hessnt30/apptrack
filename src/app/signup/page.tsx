"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const { signIn, signUp, user } = useAuth();
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (isSignUp) {
        const newUser = await signUp(email, password);
        if (newUser) {
          router.push("/");
        }
      } else {
        const signedInUser = await signIn(email, password);
        if (signedInUser) {
          router.push("/");
        }
      }
    } catch (err) {
      setError("Authentication failed. Please try again");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">
        {isSignUp ? "Sign Up" : "Sign In"}
      </h1>
      <form onSubmit={handleAuth} className="flex flex-col w-80 text-black-500">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 mb-4 border border-gray-300 rounded text-black"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 mb-4 border border-gray-300 rounded text-black"
          required
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded mb-4"
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </form>
      <p
        className="text-blue-500 cursor-pointer"
        onClick={() => setIsSignUp(!isSignUp)}
      >
        {isSignUp
          ? "Already have an account? Sign In"
          : "Don't have an account? Sign Up"}
      </p>
    </div>
  );
}
