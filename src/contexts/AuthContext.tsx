// src/contexts/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth"; // Import User type
import { auth } from "../../firebase"; // Adjust path if needed

// Define the shape of the context value
interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
}

// Create the context with an initial undefined value or a default shape
// Using undefined helps ensure the context is used within the provider
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the auth context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Define the props for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode; // Type children using ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null); // Type state with User | null
  const [loading, setLoading] = useState<boolean>(true); // Type state with boolean

  useEffect(() => {
    // Firebase listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      console.log(
        "Auth State Changed:",
        user ? `User logged in: ${user.uid}` : "User logged out"
      );
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []); // Empty dependency array

  const value: AuthContextType = {
    currentUser,
    loading,
  };

  // Don't render children until loading is false
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
