import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sword, Trophy, User, Flame } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Navbar = () => {
    const { user } = useUser();

    return (
        <nav className="sticky top-0 z-50 bg-[#09090b]/80 backdrop-blur-xl border-b border-[rgba(255,255,255,0.05)]">
            <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">

                {/* Logo */}
                <div className="flex items-center gap-3">
                    <NavLink to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:scale-110 transition-transform">
                            <Sword size={20} className="text-white" />
                        </div>
                        <span className="font-bold text-xl tracking-tight hidden sm:block group-hover:text-white transition-colors">LinguaQuest</span>
                    </NavLink>
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-1 bg-white/5 p-1.5 rounded-2xl border border-white/5">
                    <NavLink
                        to="/"
                        className={({ isActive }) => `px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        Quests
                    </NavLink>
                    <NavLink
                        to="/leaderboard"
                        className={({ isActive }) => `px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        Leaderboard
                    </NavLink>
                    <NavLink
                        to="/profile"
                        className={({ isActive }) => `px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        Profile
                    </NavLink>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 hover:bg-orange-500/20 transition-colors cursor-help" title="Current Streak">
                        <Flame size={16} className="text-orange-500" fill="currentColor" />
                        <span className="font-bold text-orange-500 text-sm hidden sm:block">{user?.streak || 0}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20 hover:bg-yellow-500/20 transition-colors cursor-help" title="Total XP">
                        <Trophy size={16} className="text-yellow-500" />
                        <span className="font-bold text-yellow-500 text-sm hidden sm:block">{user?.xp || 0}</span>
                    </div>

                    <NavLink to="/profile" className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 overflow-hidden flex items-center justify-center hover:border-violet-500 transition-colors">
                        {user?.avatar ? (
                            <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <User size={20} className="text-gray-400" />
                        )}
                    </NavLink>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;
