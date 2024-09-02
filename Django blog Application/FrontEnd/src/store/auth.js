import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

// Create a custom Zustand store named 'useAuthStore' with added reading tracking.
const useAuthStore = create((set, get) => ({
    allUserData: null, // Stores all user data
    loading: false, // Indicates loading state
    readingProgress: {}, // Stores reading progress for each blog post

    // Get user-related data
    user: () => ({
        user_id: get().allUserData?.user_id || null,
        username: get().allUserData?.username || null,
    }),

    // Set user data
    setUser: (user) => set({ allUserData: user }),

    // Set loading state
    setLoading: (loading) => set({ loading }),

    // Check if user is logged in
    isLoggedIn: () => get().allUserData !== null,

    // Get reading progress for a specific blog post
    getReadingProgress: (postId) => get().readingProgress[postId] || 0,

    // Update reading progress for a specific blog post
    updateReadingProgress: (postId, progress) => set(state => ({
        readingProgress: {
            ...state.readingProgress,
            [postId]: progress,
        }
    })),

    // Set reading progress from local storage or backend
    loadReadingProgress: () => {
        const storedProgress = JSON.parse(localStorage.getItem('readingProgress')) || {};
        set({ readingProgress: storedProgress });
    },

    // Save reading progress to local storage or backend
    saveReadingProgress: () => {
        localStorage.setItem('readingProgress', JSON.stringify(get().readingProgress));
    }
}));

// Conditionally attach the DevTools only in a development environment.
if (import.meta.env.DEV) {
    mountStoreDevtool('Store', useAuthStore);
}

export { useAuthStore };
