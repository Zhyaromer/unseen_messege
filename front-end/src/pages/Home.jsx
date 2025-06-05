import { useState, useEffect } from 'react';
import "../index.css";
import Main_Card from "../component/Main_Card.jsx";
import Nav from "../component/Nav.jsx";
import Footer from "../component/Footer.jsx";
import axios from 'axios';

export default function Home() {
    const [messages, setMessages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/post/get_all_posts');
                const data = response.data;

                if (Array.isArray(data)) {
                    setMessages(data);
                } else {
                    console.error('Unexpected data format:', data);
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMessages();
    }, []);

    const filteredMessages = messages.filter(message =>
        message.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div dir='rtl' className="min-h-screen bg-gradient-to-b from-pink-50/50 to-rose-50/50">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute text-pink-200/40 animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            fontSize: `${Math.random() * 20 + 10}px`,
                            animationDuration: `${Math.random() * 15 + 10}s`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    >
                        ❤️
                    </div>
                ))}
            </div>

            <Nav tab='unsent' />

            <main className="container mx-auto px-4 py-8 relative z-0">

                <div className='flex justify-center items-center mb-8'>
                    <div dir="rtl">
                        <div className="w-80 h-80 border-4 border-black text-lg flex flex-col">
                            <div className="flex justify-between items-center px-3 bg-white">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold">بۆ : </span>
                                </div>
                                <div className="flex items-center ">
                                    <img className="w-12 h-12" src="https://www.svgrepo.com/show/37899/email-black-envelope-back.svg" alt="" />
                                </div>
                            </div>

                            <div className="bg-white flex-grow relative">
                                <img className='absolute w-full h-full object-cover' src="photo_2025-06-06_00-28-02.jpg" alt="" />
                            </div>

                            <div className="flex justify-center items-center p-3 bg-white font-bold">
                                <span className="text-gray-600">لیمینا#</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-2xl mx-auto mb-12">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="...بە دوای ناو بگەڕێ 🔍"
                            className="w-full px-6 py-4 rounded-full border border-pink-200 focus:ring-2 focus:ring-pink-300 focus:border-transparent focus:outline-none shadow-sm text-pink-800 placeholder-pink-600/70 bg-white/90 backdrop-blur-sm transition-all duration-300 font-light"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className='flex justify-center items-center pb-4'>
                    <h2 className="text-xl md:text-2xl font-bold text-pink-600/80 text-center">کۆمەڵێک نامەی پێنەنێردراو بۆ یەکەم خۆشەویستەکان</h2>
                </div>

                <div className="text-center mb-12">
                    <p className="text-pink-600/80 text-lg font-light flex items-center justify-center">
                        {filteredMessages.length} نامە دۆزرایەوە✨
                    </p>
                </div>

                <div className="flex justify-center">
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {filteredMessages.map(card => (
                            <div>
                                <Main_Card key={card.id} id={card.id} name={card.name} message={card.message} videoTitle={card.videoTitle} videoThumbnail={card.videoThumbnail} videoUrl={card.link} />
                                <h1>{filteredMessages.videoTitle}</h1>
                            </div>
                        ))}
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
};
