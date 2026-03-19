import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle, XCircle, AlertCircle, Timer } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { topicQuestions } from '../data/advancedQuestions';
import confetti from 'canvas-confetti';

const Quiz = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { updateProfile } = useUser();

    // Directly access the array of questions for the topic
    const rawQuestions = topicQuestions[id] || [];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes

    // Shuffling logic & State Reset
    useEffect(() => {
        if (rawQuestions.length > 0) {
            const processed = rawQuestions.map(q => {
                const optionsWithOrig = q.options.map((opt, i) => ({
                    text: opt,
                    isCorrect: i === q.correctAnswer
                }));
                // Shuffle using sort
                const shuffled = [...optionsWithOrig].sort(() => Math.random() - 0.5);

                return {
                    ...q,
                    options: shuffled.map(s => s.text),
                    correctAnswer: shuffled.findIndex(s => s.isCorrect)
                };
            });
            setShuffledQuestions(processed);
        } else {
            setShuffledQuestions([]);
        }

        // Reset quiz state
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setIsAnswered(false);
        setIsCorrect(false);
        setScore(0);
        setShowResult(false);
        setTimeLeft(3600);
    }, [id]);

    // Timer Logic
    useEffect(() => {
        if (showResult || shuffledQuestions.length === 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setShowResult(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [showResult, shuffledQuestions.length]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (!rawQuestions || rawQuestions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
                <AlertCircle size={48} className="text-yellow-500" />
                <h2 className="text-2xl font-bold">Content Coming Soon</h2>
                <p className="text-gray-400">This module is currently under development.</p>
                <button onClick={() => navigate('/')} className="btn btn-secondary">Go Back</button>
            </div>
        );
    }

    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    if (!currentQuestion) return null; // Wait for shuffle

    const progress = ((currentQuestionIndex) / shuffledQuestions.length) * 100;

    const handleOptionClick = (index) => {
        if (isAnswered) return;
        setSelectedOption(index);
    };

    const checkAnswer = () => {
        if (selectedOption === null) return;

        const correct = selectedOption === currentQuestion.correctAnswer;
        setIsCorrect(correct);
        setIsAnswered(true);

        if (correct) {
            setScore(prev => prev + 1);
        }
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < shuffledQuestions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedOption(null);
            setIsAnswered(false);
            setIsCorrect(false);
        } else {
            finishQuiz();
        }
    };

    const finishQuiz = () => {
        setShowResult(true);
        // Score is already updated in checkAnswer
        const passThreshold = Math.ceil(shuffledQuestions.length * 0.7);

        if (score + (isCorrect ? 0 : 0) >= passThreshold) { // Note: score is already updated
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#8b5cf6', '#ec4899', '#10b981']
            });
            updateProfile({ xp: (prev) => (prev || 0) + 50 });
        }
    };

    if (showResult) {
        return (
            <div className="max-w-xl mx-auto py-10 text-center space-y-8">
                <div className="glass-panel p-10 flex flex-col items-center gap-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-full flex items-center justify-center shadow-lg shadow-violet-500/30">
                        <CheckCircle size={48} className="text-white" />
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold">Quest Completed!</h2>

                        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                            <div className="glass-panel p-4 rounded-2xl bg-white/5 border-white/10">
                                <p className="text-sm text-gray-500 uppercase tracking-wider font-bold">Score</p>
                                <p className="text-2xl font-mono text-violet-400">{score}/{shuffledQuestions.length}</p>
                            </div>
                            <div className="glass-panel p-4 rounded-2xl bg-white/5 border-white/10">
                                <p className="text-sm text-gray-500 uppercase tracking-wider font-bold">Accuracy</p>
                                <p className="text-2xl font-mono text-emerald-400">
                                    {Math.round((score / shuffledQuestions.length) * 100)}%
                                </p>
                            </div>
                        </div>

                        <p className="text-gray-400 text-lg">
                            {Math.round((score / shuffledQuestions.length) * 100) >= 70
                                ? "🎉 Outstanding! You've mastered this topic!"
                                : "Keep practicing! You're getting better every day."}
                        </p>
                    </div>

                    <div className="flex gap-4 w-full">
                        <button onClick={() => navigate('/')} className="btn btn-secondary flex-1">Back to Path</button>
                        <button onClick={() => navigate('/leaderboard')} className="btn btn-primary flex-1">Check Rank</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto py-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full transition">
                    <ArrowLeft size={24} />
                </button>

                {/* Timer Added */}
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                    <Timer size={18} className={timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-violet-400'} />
                    <span className={`font-mono text-sm font-bold ${timeLeft < 300 ? 'text-red-500' : 'text-gray-200'}`}>
                        {formatTime(timeLeft)}
                    </span>
                </div>

                <div className="flex-1 mx-6 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <span className="font-mono text-sm text-gray-400">
                    {currentQuestionIndex + 1}/{shuffledQuestions.length}
                </span>
            </div>

            {/* Question Card */}
            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentQuestionIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                >
                    <div className="text-center space-y-4">
                        <h2 className="text-2xl font-bold">{currentQuestion.question}</h2>
                        {currentQuestion.codeSnippet && (
                            <pre className="bg-[#1e1e1e] p-4 rounded-xl text-left text-sm font-mono overflow-x-auto shadow-inner border border-white/5">
                                <code>{currentQuestion.codeSnippet}</code>
                            </pre>
                        )}
                    </div>

                    <div className="grid gap-3">
                        {currentQuestion.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleOptionClick(index)}
                                disabled={isAnswered}
                                className={`
                  p-4 rounded-xl border text-left font-medium transition-all duration-200
                  ${isAnswered
                                        ? index === currentQuestion.correctAnswer
                                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                                            : index === selectedOption
                                                ? 'bg-red-500/20 border-red-500 text-red-400'
                                                : 'bg-white/5 border-white/5 opacity-50'
                                        : selectedOption === index
                                            ? 'bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-500/20 scale-[1.02]'
                                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                                    }
                `}
                            >
                                {option}
                            </button>
                        ))}
                    </div>

                </motion.div>
            </AnimatePresence>

            {/* Bottom Action Bar */}
            <div className="fixed bottom-0 left-0 w-full p-6 border-t border-white/10 bg-[#09090b]/90 backdrop-blur-lg z-50">
                <div className="max-w-2xl mx-auto flex items-center justify-between">
                    {isAnswered ? (
                        <div className={`flex items-center gap-3 ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                            {isCorrect ? <CheckCircle size={24} /> : <XCircle size={24} />}
                            <div>
                                <p className="font-bold text-lg">{isCorrect ? 'Excellent!' : 'Incorrect'}</p>
                                {!isCorrect && <p className="text-sm text-gray-400">Correct: {currentQuestion.options[currentQuestion.correctAnswer]}</p>}
                            </div>
                        </div>
                    ) : (
                        <div /> // Spacer
                    )}

                    <button
                        type="button"
                        onClick={isAnswered ? nextQuestion : checkAnswer}
                        disabled={selectedOption === null}
                        className={`
              px-10 py-4 rounded-xl font-bold text-lg transition-all relative z-50 cursor-pointer
              ${selectedOption === null
                                ? 'bg-gray-800 text-gray-500 cursor-not-allowed opacity-50'
                                : isAnswered
                                    ? isCorrect
                                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 active:scale-95'
                                        : 'bg-gray-700 text-white hover:bg-gray-600 active:scale-95'
                                    : 'bg-violet-600 text-white shadow-lg shadow-violet-500/30 hover:bg-violet-700 active:scale-95'
                            }
            `}
                        style={{ pointerEvents: 'auto' }}
                    >
                        {isAnswered ? (currentQuestionIndex === shuffledQuestions.length - 1 ? 'Finish' : 'Next') : 'Check'}
                    </button>
                </div>
            </div>

            {/* Spacer for fixed footer */}
            <div className="h-24" />
        </div>
    );
};

export default Quiz;
