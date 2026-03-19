import React from 'react';
import { Trophy, Medal, User } from 'lucide-react';
import { motion } from 'framer-motion';

const users = [
    { rank: 1, name: 'Sarah Wilson', xp: 2450, avatar: 'SW', league: 'Diamond' },
    { rank: 2, name: 'Mike Chen', xp: 2300, avatar: 'MC', league: 'Diamond' },
    { rank: 3, name: 'You', xp: 2150, avatar: 'YP', league: 'Diamond', current: true },
    { rank: 4, name: 'Emma Davis', xp: 1950, avatar: 'ED', league: 'Platinum' },
    { rank: 5, name: 'Alex Turner', xp: 1800, avatar: 'AT', league: 'Platinum' },
];

const Leaderboard = () => {
    return (
        <div className="max-w-2xl mx-auto py-10 space-y-8">

            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center p-4 bg-yellow-500/10 rounded-full mb-4 ring-2 ring-yellow-500/20">
                    <Trophy size={48} className="text-yellow-500" fill="currentColor" />
                </div>
                <h1 className="text-3xl font-bold font-heading">Diamond League</h1>
                <p className="text-gray-400">Top 10 advance to the next league!</p>
            </div>

            <div className="space-y-3">
                {users.map((user, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`
              flex items-center justify-between p-4 rounded-2xl border transition-all
              ${user.current
                                ? 'bg-violet-600/20 border-violet-500/50 shadow-lg shadow-violet-500/10'
                                : 'bg-[#18181b]/60 border-white/5 hover:bg-[#18181b]/80'}
            `}
                    >
                        <div className="flex items-center gap-4">
                            <span className={`
                w-8 font-bold text-center
                ${index === 0 ? 'text-yellow-400 text-xl' :
                                    index === 1 ? 'text-gray-300 text-xl' :
                                        index === 2 ? 'text-orange-400 text-xl' : 'text-gray-500'}
              `}>
                                {user.rank}
                            </span>

                            <div className={`
                w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                ${user.current ? 'bg-violet-500 text-white' : 'bg-gray-700 text-gray-300'}
              `}>
                                {user.avatar}
                            </div>

                            <div>
                                <h3 className={`font-bold ${user.current ? 'text-white' : 'text-gray-200'}`}>
                                    {user.name}
                                </h3>
                                <span className="text-xs text-gray-500">{user.league}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="font-bold text-yellow-500">{user.xp} XP</span>
                            {index < 3 && <Medal size={16} className={index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-300' : 'text-orange-400'} />}
                        </div>
                    </motion.div>
                ))}
            </div>

        </div>
    );
};

export default Leaderboard;
