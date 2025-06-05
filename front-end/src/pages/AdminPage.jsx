import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminPage() {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/admin/get_all_posts_admin');
                if (response.data && Array.isArray(response.data)) {
                    setMessages(response.data);
                } else {
                    console.error('Unexpected data format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, []);

    const handleAccept = async (id) => {
        try {
            const res = await axios.post(`http://localhost:3000/api/admin/approve_message/${id}`);

            if (res.status === 200) {
                alert(`Message with ID ${id} accepted`);
                setSelectedMessage(null);
                setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
            }
        } catch (error) {
            console.error('Error accepting message:', error);
            alert(`Failed to accept message with ID ${id}`);
        }
    };

    const handleReject = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:3000/api/admin/delete_message/${id}`);

            if (res.status === 200) {
                alert(`Message with ID ${id} deleted`);
                setSelectedMessage(null);
                setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
            }
            setSelectedMessage(null);
        } catch (error) {
            console.error('Error accepting message:', error);
            alert(`Failed to accept message with ID ${id}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4" dir="rtl">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">بەڕێوەبردنی پەیامەکان</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md">
                            <div className="p-4 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-900">لیستی پەیامەکان</h2>
                            </div>
                            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${selectedMessage?.id === message.id ? 'bg-blue-50 border-r-4 border-blue-500' : ''
                                            }`}
                                        onClick={() => setSelectedMessage(message)}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{message.name}</h3>
                                                <p className="text-sm text-gray-500">{message.timestamp}</p>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 text-sm line-clamp-2">{message.message}</p>
                                        {message.videoTitle && (
                                            <div className="mt-2 flex items-center gap-2">
                                                <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                                                    <span className="text-white text-xs font-bold">YT</span>
                                                </div>
                                                <span className="text-xs text-gray-600">{message.videoTitle}</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md sticky top-4">
                            {selectedMessage ? (
                                <div>
                                    <div className="p-4 border-b border-gray-200">
                                        <h2 className="text-xl font-semibold text-gray-900">وردەکاریەکان</h2>
                                    </div>
                                    <div className="p-4">
                                        <div className="mb-4">
                                            <h3 className="font-semibold text-gray-900 mb-1">{selectedMessage.name}</h3>
                                            <p className="text-sm text-gray-500 mb-2">{selectedMessage.timestamp}</p>
                                        </div>

                                        <div className="mb-4">
                                            <h4 className="font-medium text-gray-900 mb-2">پەیام:</h4>
                                            <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedMessage.message}</p>
                                        </div>

                                        {selectedMessage.videoTitle && (
                                            <div className="mb-4">
                                                <h4 className="font-medium text-gray-900 mb-2">ڤیدیۆی پەیوەست:</h4>
                                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                    <img
                                                        className="w-16 h-12 rounded object-cover"
                                                        src={selectedMessage.videoThumbnail}
                                                        alt="Video thumbnail"
                                                    />
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{selectedMessage.videoTitle}</p>
                                                        <a
                                                            href={selectedMessage.videoUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-xs text-blue-600 hover:text-blue-800"
                                                        >
                                                            بینینی ڤیدیۆ
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleAccept(selectedMessage.id)}
                                                className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors font-medium"
                                            >
                                                قبوڵکردن
                                            </button>
                                            <button
                                                onClick={() => handleReject(selectedMessage.id)}
                                                className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors font-medium"
                                            >
                                                ڕەتکردنەوە
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-8 text-center text-gray-500">
                                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.001 8.001 0 01-7.75-6M3 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
                                        </svg>
                                    </div>
                                    <p>پەیامێک هەڵبژێرە بۆ بینینی وردەکاریەکان</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}