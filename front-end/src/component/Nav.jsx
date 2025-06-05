import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Nav({tab}) {
    const [activeTab, setActiveTab] = useState(tab || 'unsent');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        if (tab === 'unsent') {
            navigate('/');
        } else if (tab === 'send') {
            navigate('/send-message');
        } else if (tab === 'about') {
            navigate('/about');
        }
    };

    return (
        <nav dir='rtl' className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-20 border-b border-pink-100">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                     <div className="hidden md:flex space-x-1">
                        <button
                            onClick={() => handleTabChange('unsent')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'unsent' ? 'bg-pink-500 text-white' : 'text-pink-600 hover:bg-pink-100/50'}`}
                        >
                            نامەکان
                        </button>
                        <button
                            onClick={() => handleTabChange('send')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'send' ? 'bg-pink-500 text-white' : 'text-pink-600 hover:bg-pink-100/50'}`}
                        >
                           ناردنی نامە
                        </button>
                        <button
                            onClick={() => handleTabChange('about')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'about' ? 'bg-pink-500 text-white' : 'text-pink-600 hover:bg-pink-100/50'}`}
                        >
                            دەربارەی ئێمە
                        </button>
                    </div>

                    <div className="flex items-center space-x-2">
                        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500 font-serif">
                            لیمینا
                        </h1>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={toggleMobileMenu}
                            className="p-2 rounded-lg text-pink-600 hover:bg-pink-100/50 transition-colors"
                        >
                            {isMobileMenuOpen ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <div className="md:hidden pb-4 border-t border-pink-100 mt-4 pt-4">
                        <div className="flex flex-col space-y-2">
                            <button
                                onClick={() => { setActiveTab('unsent'); setIsMobileMenuOpen(false); }}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all text-left ${activeTab === 'unsent' ? 'bg-pink-500 text-white' : 'text-pink-600 hover:bg-pink-100/50'}`}
                            >
                                نامەکان
                            </button>
                            <button
                                onClick={() => { setActiveTab('send'); setIsMobileMenuOpen(false); }}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all text-left ${activeTab === 'send' ? 'bg-pink-500 text-white' : 'text-pink-600 hover:bg-pink-100/50'}`}
                            >
                                ناردنی نامە
                            </button>
                            <button
                                onClick={() => { setActiveTab('about'); setIsMobileMenuOpen(false); }}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all text-left ${activeTab === 'about' ? 'bg-pink-500 text-white' : 'text-pink-600 hover:bg-pink-100/50'}`}
                            >
                                دەربارەی ئێمە
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}