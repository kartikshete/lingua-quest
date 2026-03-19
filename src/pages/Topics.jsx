import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, BookOpen, Star } from 'lucide-react';
import { questTopics } from '../data/advancedQuestions';

const Topics = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const quest = questTopics[id];

    if (!quest) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
                <BookOpen size={48} className="text-gray-500" />
                <h2 className="text-2xl font-bold">Topics Loading...</h2>
                <p className="text-gray-400">Content for this module is being prepared.</p>
                <button onClick={() => navigate('/')} className="btn btn-secondary">Go Back</button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto py-10 space-y-8">

            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => navigate('/')} className="p-2 hover:bg-white/10 rounded-full transition">
                    <ArrowLeft size={24} />
                </button>
                <div>
                    <h1 className="text-3xl font-bold">{quest.title}</h1>
                    <p className="text-gray-400">Select a topic to start practicing</p>
                </div>
            </div>

            {/* Topics Grid */}
            <div className="grid gap-4">
                {quest.topics.map((topic, index) => (
                    <motion.div
                        key={topic.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => navigate(`/quiz/${topic.id}`)}
                        className="glass-panel p-6 flex items-center justify-between cursor-pointer hover:border-violet-500/50 hover:bg-white/5 group"
                    >
                        <div className="flex items-center gap-5">
                            <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                {topic.icon}
                            </div>
                            <div>
                                <h3 className="font-bold text-lg group-hover:text-violet-400 transition-colors">{topic.title}</h3>
                                <p className="text-sm text-gray-500">{topic.count} Questions</p>
                            </div>
                        </div>

                        <ChevronRight className="text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Topics;
