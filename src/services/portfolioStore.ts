import { db } from '../config/firebase';
import { doc, setDoc, getDoc, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';

/**
 * Generate a URL-safe slug from a name
 */
export function slugify(name) {
    if (!name) return 'portfolio';
    return name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/**
 * Check if a slug is available
 */
export async function isSlugAvailable(slug) {
    if (!slug || slug.length < 3) return false;
    const docRef = doc(db, 'portfolios', slug);
    const docSnap = await getDoc(docRef);
    return !docSnap.exists();
}

/**
 * Generate a unique slug (append random suffix to avoid collisions)
 */
export async function generateUniqueSlug(name) {
    const base = slugify(name);

    if (await isSlugAvailable(base)) return base;

    // Append random 4-char suffix
    const suffix = Math.random().toString(36).substring(2, 6);
    return `${base}-${suffix}`;
}

/**
 * Save a portfolio to Firestore
 */
export async function savePortfolio(slug, data) {
    await setDoc(doc(db, 'portfolios', slug), {
        ...data,
        slug,
        publishedAt: new Date().toISOString(),
    });
    return slug;
}

/**
 * Get a portfolio by slug from Firestore
 */
export async function getPortfolio(slug) {
    const docRef = doc(db, 'portfolios', slug);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    }
    return null;
}

/**
 * Get portfolios for a specific user
 */
export async function getUserPortfolios(userId) {
    const q = query(collection(db, 'portfolios'), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({ slug: d.id, ...d.data() }));
}

/**
 * Delete a portfolio from Firestore
 */
export async function deletePortfolio(slug) {
    await deleteDoc(doc(db, 'portfolios', slug));
}
