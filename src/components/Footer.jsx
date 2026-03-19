import React from 'react';
import { Zap } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full py-8 mt-auto border-t border-[rgba(255,255,255,0.05)] bg-[#09090b]">
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center gap-4">
                <div className="flex flex-col items-center text-center">
                    <p className="text-sm text-gray-400 font-medium">
                        Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 font-bold">Raj technologies</span> | Kartik Shete
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
