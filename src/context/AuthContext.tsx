import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithPopup, signInWithRedirect, getRedirectResult, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../config/firebase';
import { incrementUserCount } from '../services/statsService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleUserSetup = async (firebaseUser) => {
        if (!firebaseUser) return;

        try {
            const userDocRef = doc(db, 'users', firebaseUser.uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                await setDoc(userDocRef, {
                    displayName: firebaseUser.displayName,
                    email: firebaseUser.email,
                    photoURL: firebaseUser.photoURL,
                    createdAt: new Date().toISOString(),
                });
                await incrementUserCount();
            }
        } catch (error) {
            console.error('User setup failed:', error);
        }
    };

    useEffect(() => {
        // Handle the redirect result when the page reloads
        getRedirectResult(auth)
            .then((result) => {
                if (result?.user) {
                    handleUserSetup(result.user);
                }
            })
            .catch((error) => {
                console.error('Redirect result error:', error);
            });

        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
            if (firebaseUser) {
                // Also check setup on state change for existing users
                handleUserSetup(firebaseUser);
            }
        });
        return () => unsubscribe();
    }, []);

    const signIn = async () => {
        try {
            // Attempt popup first for better user experience and webview support
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error('Sign in popup failed:', error);
            if (error.code === 'auth/popup-blocked' || 
                error.code === 'auth/popup-closed-by-user' || 
                error.code === 'auth/cancelled-popup-request' ||
                error.code === 'auth/internal-error') {
                
                console.log('Falling back to redirect flow...');
                try {
                    await signInWithRedirect(auth, googleProvider);
                } catch (redirectError) {
                    console.error('Redirect sign in also failed:', redirectError);
                    throw redirectError;
                }
            } else {
                throw error;
            }
        }
    };

    const signOut = async () => {
        try {
            await firebaseSignOut(auth);
        } catch (error) {
            console.error('Sign out failed:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
}
