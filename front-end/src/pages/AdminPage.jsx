import { useState } from 'react';

// Mock data for incoming messages
const mockMessages = [
  {
    id: 1,
    name: "أحمد محمد",
    message: "سڵاو، دەمەوێت پرسیارێک لەسەر خزمەتگوزاریەکانتان بکەم. ئایا دەتوانن یارمەتیم بدەن؟",
    videoTitle: "How to use our services",
    videoThumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg",
    videoUrl: "https://youtube.com/watch?v=dQw4w9WgXcQ",
    timestamp: "2025-06-06 10:30",
    status: "pending"
  },
  {
    id: 2,
    name: "فاطمة علي",
    message: "بەڕێز، پێویستم بە زانیاری زیاتر هەیە دەربارەی پڕۆژەکەتان. تکایە پەیوەندیم پێوە بگرن.",
    videoTitle: null,
    videoThumbnail: null,
    videoUrl: null,
    timestamp: "2025-06-06 09:15",
    status: "pending"
  },
  {
    id: 3,
    name: "محمد حسن",
    message: "زۆر سوپاستان! خزمەتگوزاریەکانتان نایابن. هیوادارم کارتان بەردەوام بێت.",
    videoTitle: "Customer Testimonial",
    videoThumbnail: "https://img.youtube.com/vi/abc123/default.jpg",
    videoUrl: "https://youtube.com/watch?v=abc123",
    timestamp: "2025-06-06 08:45",
    status: "pending"
  },
  {
    id: 4,
    name: "زینب کریم",
    message: "سڵاو، دەمەوێت بزانم کە چۆن دەتوانم بەشداری لە پڕۆگرامەکانتاندا بکەم؟",
    videoTitle: "Program Registration Guide",
    videoThumbnail: "https://img.youtube.com/vi/xyz789/default.jpg",
    videoUrl: "https://youtube.com/watch?v=xyz789",
    timestamp: "2025-06-06 07:20",
    status: "pending"
  },
  {
    id: 5,
    name: "عبدالله رشید",
    message: "بەڕێزان، هەڵەیەک لە سیستەمەکەتاندا هەیە. تکایە چارەسەری بکەن.",
    videoTitle: null,
    videoThumbnail: null,
    videoUrl: null,
    timestamp: "2025-06-06 06:10",
    status: "pending"
  }
];

export default function AdminPage() {
  const [messages, setMessages] = useState(mockMessages);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter] = useState('all');

  const handleAccept = (id) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, status: 'accepted' } : msg
    ));
    setSelectedMessage(null);
  };

  const handleReject = (id) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, status: 'rejected' } : msg
    ));
    setSelectedMessage(null);
  };

  const handleDelete = (id) => {
    setMessages(messages.filter(msg => msg.id !== id));
    setSelectedMessage(null);
  };

  const filteredMessages = messages.filter(msg => {
    if (filter === 'all') return true;
    return msg.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'accepted': return 'قبوڵکراو';
      case 'rejected': return 'ڕەتکراوە';
      default: return 'چاوەڕوان';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">بەڕێوەبردنی پەیامەکان</h1>
          
          {/* Filter buttons */}
          <div className="flex gap-2 flex-wrap">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              هەموو ({messages.length})
            </button>
            <button 
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              چاوەڕوان ({messages.filter(m => m.status === 'pending').length})
            </button>
            <button 
              onClick={() => setFilter('accepted')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'accepted' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              قبوڵکراو ({messages.filter(m => m.status === 'accepted').length})
            </button>
            <button 
              onClick={() => setFilter('rejected')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'rejected' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              ڕەتکراوە ({messages.filter(m => m.status === 'rejected').length})
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">لیستی پەیامەکان</h2>
              </div>
              <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                {filteredMessages.map((message) => (
                  <div 
                    key={message.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                      selectedMessage?.id === message.id ? 'bg-blue-50 border-r-4 border-blue-500' : ''
                    }`}
                    onClick={() => setSelectedMessage(message)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{message.name}</h3>
                        <p className="text-sm text-gray-500">{message.timestamp}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(message.status)}`}>
                        {getStatusText(message.status)}
                      </span>
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

          {/* Message Detail */}
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
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedMessage.status)}`}>
                        {getStatusText(selectedMessage.status)}
                      </span>
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

                    {selectedMessage.status === 'pending' && (
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
                    )}
                    
                    <button 
                      onClick={() => handleDelete(selectedMessage.id)}
                      className="w-full mt-2 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                    >
                      سڕینەوە
                    </button>
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