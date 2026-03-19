import React from 'react';
import { Play, Lock, Star, CheckCircle, Code, Terminal, Cpu, Database, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';

const quests = [
    {
        id: 1,
        title: 'C Basics: The Foundation',
        xp: 50,
        locked: false,
        completed: true,
        stars: 3,
        icon: <Terminal size={24} />
    },
    {
        id: 2,
        title: 'C++ OOPs Concepts',
        xp: 100,
        locked: false,
        completed: false,
        stars: 0,
        icon: <Code size={24} />
    },
    {
        id: 3,
        title: 'Python: AI & Scripting',
        xp: 120,
        locked: false,
        completed: false,
        stars: 0,
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="py" className="w-6 h-6" />
    },
    {
        id: 4,
        title: 'HTML5 Structure',
        xp: 150,
        locked: false,
        completed: false,
        stars: 0,
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="html" className="w-6 h-6" />
    },
    {
        id: 5,
        title: 'CSS3 Styling Mastery',
        xp: 180,
        locked: false,
        completed: false,
        stars: 0,
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="css" className="w-6 h-6" />
    },
    {
        id: 6,
        title: 'JavaScript Interactivity',
        xp: 200,
        locked: false,
        completed: false,
        stars: 0,
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="js" className="w-6 h-6" />
    },
    {
        id: 7,
        title: 'Data Structures (DSA)',
        xp: 250,
        locked: false,
        completed: false,
        stars: 0,
        icon: <Database size={24} />
    },
    {
        id: 8,
        title: 'Java Mastery Curriculum',
        xp: 300,
        locked: false,
        completed: false,
        stars: 0,
        icon: <Coffee size={24} />
    },
];

import { useNavigate } from 'react-router-dom';

const Quests = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-2xl mx-auto py-10 space-y-8">

            <div className="text-center space-y-2 mb-12">
                <h1 className="text-4xl font-bold font-heading bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                    Code Mastery Path
                </h1>
                <p className="text-gray-400">Master C, C++, Python, Web Dev & DSA to become a dev legend!</p>
            </div>

            <div className="relative flex flex-col items-center gap-12">
                {/* Connecting Line */}
                <div className="absolute top-8 bottom-8 w-1 bg-white/5 rounded-full -z-10" />

                {quests.map((quest, index) => (
                    <motion.div
                        key={quest.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`relative group w-full max-w-md ${index % 2 === 0 ? 'ml-0' : 'ml-0'}`}
                    >
                        <div
                            onClick={() => !quest.locked && navigate(`/topics/${quest.id}`)}
                            className={`
                              glass-panel p-6 flex items-center justify-between gap-6 cursor-pointer
                              ${quest.locked ? 'opacity-60 grayscale cursor-not-allowed' : 'hover:scale-[1.02] border-violet-500/30'}
                            `}
                        >

                            <div className="flex items-center gap-4">
                                <div className={`
                  w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg
                  ${quest.completed
                                        ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-emerald-500/20'
                                        : quest.locked
                                            ? 'bg-gray-800 text-gray-500'
                                            : 'bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white shadow-violet-500/20 animate-pulse'}
                `}>
                                    {quest.completed ? <CheckCircle size={24} /> : quest.locked ? <Lock size={24} /> : quest.icon}
                                </div>

                                <div>
                                    <h3 className="font-bold text-lg">{quest.title}</h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-400">
                                        <span className="text-yellow-500 flex items-center gap-1 font-semibold">
                                            <Star size={14} fill="currentColor" /> {quest.xp} XP
                                        </span>
                                        {quest.completed && (
                                            <div className="flex gap-0.5">
                                                {[...Array(quest.stars)].map((_, i) => (
                                                    <Star key={i} size={12} className="text-yellow-400" fill="currentColor" />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {!quest.locked && !quest.completed && (
                                <button className="px-4 py-2 bg-white/10 rounded-xl text-sm font-semibold hover:bg-white/20 transition">
                                    Start
                                </button>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Quests;
