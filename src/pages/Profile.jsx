import React, { useState, useRef } from 'react';
import { Flame, Trophy, Target, Clock, Settings, Edit2, Camera, Save, X } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { motion } from 'framer-motion';

const Profile = () => {
    const { user, updateProfile, handleAvatarUpload } = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const fileInputRef = useRef(null);

    // Local state for form editing
    const [formData, setFormData] = useState({
        name: user.name,
        username: user.username,
    });

    const handleEditClick = () => {
        setFormData({ name: user.name, username: user.username });
        setIsEditing(true);
    };

    const handleSave = () => {
        updateProfile(formData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const onFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleAvatarUpload(file);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Profile Card */}
            <div className="md:col-span-1 space-y-6">
                <div className="glass-panel p-6 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-violet-600 to-fuchsia-600 opacity-20" />

                    <div className="relative">
                        <div className="group relative w-28 h-28 mx-auto mb-4">
                            <div className="w-full h-full rounded-full bg-gray-800 border-4 border-[#09090b] shadow-xl overflow-hidden flex items-center justify-center relative z-10">
                                {user.avatar ? (
                                    <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-3xl font-bold text-gray-400">{user.name.charAt(0)}</span>
                                )}
                            </div>

                            {/* Camera Icon Overlay */}
                            <button
                                onClick={triggerFileInput}
                                className="absolute bottom-0 right-0 p-2 bg-violet-600 rounded-full text-white shadow-lg hover:bg-violet-500 transition-colors z-20 cursor-pointer"
                                title="Change Photo"
                            >
                                <Camera size={16} />
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={onFileChange}
                                className="hidden"
                                accept="image/*"
                            />
                        </div>

                        {isEditing ? (
                            <div className="space-y-3 px-2">
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-center font-bold text-white focus:outline-none focus:border-violet-500"
                                    placeholder="Your Name"
                                />
                                <input
                                    type="text"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-center text-sm text-gray-300 focus:outline-none focus:border-violet-500"
                                    placeholder="@username"
                                />
                                <div className="flex gap-2 justify-center mt-2">
                                    <button onClick={handleSave} className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30"><Save size={18} /></button>
                                    <button onClick={handleCancel} className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30"><X size={18} /></button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
                                    {user.name}
                                    <button onClick={handleEditClick} className="text-gray-500 hover:text-white transition-colors">
                                        <Edit2 size={16} />
                                    </button>
                                </h2>
                                <p className="text-gray-400">{user.username}</p>
                                <p className="text-sm text-gray-500 mt-2">Joined {user.joinedDate}</p>
                            </>
                        )}
                    </div>

                    <div className="mt-6 flex flex-col gap-3">
                        <button className="btn btn-secondary w-full justify-between group">
                            <span className="flex items-center gap-2 group-hover:text-white transition-colors"><Settings size={16} /> Settings</span>
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <motion.div whileHover={{ scale: 1.02 }} className="glass-panel p-4 flex flex-col items-center justify-center gap-1 border-orange-500/20 bg-orange-500/5">
                        <Flame size={24} className="text-orange-500 mb-1" fill="currentColor" />
                        <span className="text-2xl font-bold">{user.streak}</span>
                        <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Streak</span>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} className="glass-panel p-4 flex flex-col items-center justify-center gap-1 border-yellow-500/20 bg-yellow-500/5">
                        <Trophy size={24} className="text-yellow-500 mb-1" />
                        <span className="text-2xl font-bold">{user.xp}</span>
                        <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Total XP</span>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} className="glass-panel p-4 flex flex-col items-center justify-center gap-1 border-blue-500/20 bg-blue-500/5">
                        <Target size={24} className="text-blue-500 mb-1" />
                        <span className="text-2xl font-bold">{user.league}</span>
                        <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">League</span>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} className="glass-panel p-4 flex flex-col items-center justify-center gap-1 border-emerald-500/20 bg-emerald-500/5">
                        <Clock size={24} className="text-emerald-500 mb-1" />
                        <span className="text-2xl font-bold">14h</span>
                        <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Spent</span>
                    </motion.div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="md:col-span-2 space-y-6">

                {/* Achievements */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold px-1 flex items-center gap-2">
                        <Trophy size={20} className="text-yellow-500" /> Achievements
                    </h3>
                    <div className="glass-panel p-6">
                        <div className="space-y-6">
                            {[
                                { title: 'Early Riser', desc: 'Complete a lesson before 8 AM', icon: '🌅', color: 'orange' },
                                { title: 'Sharp Shooter', desc: 'Get 100% in 5 lessons', icon: '🎯', color: 'red' },
                                { title: 'Scholar', desc: 'Learn 500 new words', icon: '📚', color: 'blue' },
                            ].map((ach, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-4 hover:bg-white/5 p-3 rounded-xl transition-colors"
                                >
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-${ach.color}-500/10 border border-${ach.color}-500/20`}>
                                        {ach.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-200">{ach.title}</h4>
                                        <p className="text-sm text-gray-500">{ach.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                            <button className="w-full py-2 text-center text-sm text-gray-400 hover:text-white transition">View All Achievements</button>
                        </div>
                    </div>
                </div>

                {/* Current Friends */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold px-1 flex items-center gap-2">
                        <Target size={20} className="text-violet-500" /> Friends
                    </h3>
                    <div className="glass-panel p-6 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center font-bold">AJ</div>
                                <div>
                                    <h4 className="font-bold text-sm">Alex Johnson</h4>
                                    <p className="text-xs text-gray-500">2300 XP</p>
                                </div>
                            </div>
                            <button className="text-xs px-3 py-1 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors">Follow Back</button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center font-bold">MG</div>
                                <div>
                                    <h4 className="font-bold text-sm">Maria Garcia</h4>
                                    <p className="text-xs text-gray-500">1950 XP</p>
                                </div>
                            </div>
                            <button className="text-xs px-3 py-1 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors">Follow Back</button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Profile;
