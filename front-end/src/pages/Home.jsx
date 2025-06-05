import { useState, useEffect } from 'react';
import "../index.css";
import Main_Card from "../component/Main_Card.jsx";
import Nav from "../component/Nav.jsx";
import Footer from "../component/Footer.jsx";

export default function Home() {
    const [messages, setMessages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const mockCards = [
            {
                id: 1,
                name: "سارا",
                message: "هیوادارم ڕۆژێکت پڕ بێت لە په‌یوه‌ندی و خۆشی! تۆ کەسێکی تایبه‌تیت."
            },
            {
                id: 2,
                name: "عەلی",
                message: "سوپاس بۆ هه‌موو یارمه‌تییه‌کانی تۆ. بێ تۆ ئه‌م سه‌رکه‌وتنه‌م نه‌ده‌کرد."
            },
            {
                id: 3,
                name: "هێمن",
                message: "به‌ختێکی زۆر بۆت له‌ ژیاندا! هه‌رگیز وه‌ستا مه‌که‌ له‌ ئاره‌زووه‌کانی خۆت."
            },
            {
                id: 4,
                name: "ڕێزان",
                message: "تۆ وه‌ک ئه‌ستێره‌یه‌ک له‌ تاریکیدا دره‌خشێنیت. مه‌به‌ستی منی ڕوونکردنه‌وه‌."
            },
            {
                id: 5,
                name: "ڤیان",
                message: "پێغه‌مبه‌رێک وتی: 'خوا به‌ چاکه‌کانی خه‌ڵکی دادپه‌روه‌ر ده‌بێت'. تۆ نموونه‌ی ئه‌م په‌یامه‌ی."
            }
        ];

        setTimeout(() => {
            setMessages(mockCards);
            setIsLoading(false);
        }, 1000);
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
                            <Main_Card key={card.id} id={card.id} name={card.name} message={card.message} />
                        ))}
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
};
