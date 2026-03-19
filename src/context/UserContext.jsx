import React, { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    // Load from LocalStorage or default
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('lingua_user');
        return saved ? JSON.parse(saved) : {
            name: 'You',
            username: '@language_learner',
            avatar: null, // null means default
            joinedDate: 'January 2026',
            xp: 2150,
            streak: 12,
            league: 'Diamond'
        };
    });

    // Save to LocalStorage whenever user changes
    useEffect(() => {
        localStorage.setItem('lingua_user', JSON.stringify(user));
    }, [user]);

    const updateProfile = (updates) => {
        setUser(prev => ({ ...prev, ...updates }));
    };

    const handleAvatarUpload = (file) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateProfile({ avatar: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <UserContext.Provider value={{ user, updateProfile, handleAvatarUpload }}>
            {children}
        </UserContext.Provider>
    );
};
