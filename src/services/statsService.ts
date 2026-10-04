import { db } from '../config/firebase';
import {
    doc,
    getDoc,
    setDoc,
    onSnapshot,
    increment,
    updateDoc,
} from 'firebase/firestore';

const STATS_DOC = doc(db, 'meta', 'stats');

/**
 * Get a real-time listener on the global stats document.
 * Returns an unsubscribe function.
 *
 * Stats shape: { userCount: number, portfoliosCreated: number }
 */
export function onStatsSnapshot(callback) {
    return onSnapshot(STATS_DOC, (snap) => {
        if (snap.exists()) {
            callback(snap.data());
        } else {
            callback({ userCount: 0, portfoliosCreated: 0 });
        }
    });
}

/**
 * Ensure the stats document exists (called once at init)
 */
async function ensureStatsDoc() {
    const snap = await getDoc(STATS_DOC);
    if (!snap.exists()) {
        await setDoc(STATS_DOC, { userCount: 0, portfoliosCreated: 0 });
    }
}

/**
 * Increment user count by 1 (call on first-time sign-up)
 */
export async function incrementUserCount() {
    try {
        await ensureStatsDoc();
        await updateDoc(STATS_DOC, { userCount: increment(1) });
    } catch (err) {
        console.error('Failed to increment user count:', err);
    }
}

/**
 * Increment portfolio count by 1 (call when a portfolio is published)
 */
export async function incrementPortfolioCount() {
    try {
        await ensureStatsDoc();
        await updateDoc(STATS_DOC, { portfoliosCreated: increment(1) });
    } catch (err) {
        console.error('Failed to increment portfolio count:', err);
    }
}
