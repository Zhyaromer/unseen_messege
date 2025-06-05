import { useState } from "react";
import Nav from "../component/Nav.jsx";
import Footer from "../component/Footer.jsx";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import axios from "axios";

export default function SendMessage() {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [musicLink, setMusicLink] = useState("");
    const [selectedColor, setSelectedColor] = useState("#4d2d2d");

    const colors = [
        "#4d2d2d", "#3e5f3a", "#2766b5", "#3e29a6", "#c1612a",
        "#020006", "#d3cfd5", "#54502f", "#2b1a1a", "#2f4a2d",
        "#1f4a91", "#2f1a91", "#a34f1f", "#1a0004", "#c9c6cc",
        "#444127", "#5a3b3b", "#486b48", "#2b6cc2", "#4933c2",
        "#c96f2f", "#1a0a1f", "#f0ecf3", "#6c6834", "#3a1f1f",
        "#2f3d2f", "#1a2f6b", "#2f1a6b", "#f472b6", "#ec4899",
        "#db2777", "#c084fc", "#a855f7", "#9333ea", "#fb923c",
        "#f97316", "#ea580c", "#fde047", "#facc15", "#eab308"
    ];

    const handleSend = async () => {
        if (name.trim() && message.trim() && selectedColor) {
            
            if (musicLink && !isValidYouTubeUrl(musicLink)) {
                alert("تکایە بەستەری یوتیوبی دروست بنووسە");
                return;
            }
            console.log("Sending message...2");
            if (musicLink && !musicLink.startsWith("https://")) {
                alert("تکایە بەستەری یوتیوبی بە شێوەی دروست بنووسە (https://...)");
                return;
            }
            if (name.length > 20 || message.length > 120) {
                alert("ناو یان پەیامەکە زۆر درێژە، تکایە کەمتر بنووسە");
                return;
            }

            const data = {
                name,
                message,
                link : musicLink,
                color: selectedColor,
            };

            try {
                const res = await axios.post("http://localhost:3000/api/post/add_post", data);
                if (res.status === 201) {
                    alert("پەیامەکەت نێردرا!");
                    setName("");
                    setMessage("");
                    setMusicLink("");
                    setSelectedColor("#4d2d2d");
                }
            } catch (error) {
                console.error("Error sending message:", error);
                alert("هەڵەیەک ڕوویدا، تکایە دووبارە هەوڵ بدە");
            }
        } else {
            alert("تکایە ناو و پەیامەکە پڕ بکەرەوە ");
        }
    };

    const isValidYouTubeUrl = (url) => {
        const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
        return pattern.test(url);
    };

    return (
        <div>
            <Nav tab="send" />
            <div className="min-h-screen bg-gradient-to-b from-pink-50/50 to-rose-50/50 flex flex-col items-center justify-center">
                <h1 className="text-2xl pt-6 font-bold m-6 text-gray-800" dir="rtl">
                    پەیامێک بنێرە
                </h1>

                <div dir="rtl">
                    <div className="md:w-96 h-96 border-4 border-black text-lg flex flex-col">
                        <div className="flex justify-between items-center px-3 py-0 bg-white">
                            <div className="flex items-center gap-2">
                                <span className="font-bold">بۆ : </span>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="ناو"
                                    maxLength={20}
                                    className="font-bold bg-transparent border-none outline-none placeholder-gray-400"
                                    dir="rtl"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <img className="w-12 h-12" src="https://www.svgrepo.com/show/37899/email-black-envelope-back.svg" alt="" />
                            </div>
                        </div>

                        <div className="px-2 bg-white flex-grow">
                            <div style={{ backgroundColor: selectedColor }} className="p-2 text-2xl leading-relaxed h-full">
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    maxLength={120}
                                    placeholder="پەیامەکەت لێرە بنووسە..."
                                    className="text-black font-semibold w-full h-full bg-transparent border-none outline-none resize-none placeholder-gray-400"
                                    dir="rtl"
                                />
                            </div>
                        </div>

                        <div className="flex justify-center items-center p-3 bg-white font-bold">
                            <span className="text-gray-600">لیمینا#</span>
                        </div>
                    </div>
                </div>

                <div className="mt-4 w-full max-w-md flex flex-col items-center gap-2 justify-center" dir="rtl">
                    <label className="block text-md font-medium text-gray-700 mb-2">
                        ڕەنگی پەیامەکە هەڵبژێرە
                    </label>
                    <div className="grid grid-cols-6 md:grid-cols-8 gap-2 p-3 bg-gray-50 rounded-lg">
                        {colors.map((color, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedColor(color)}
                                style={{ backgroundColor: color }}
                                className={`w-12 h-12 border rounded-sm hover:scale-110 transition-transform ${selectedColor === color ? 'border-black border-2 shadow-lg' : 'border-gray-400'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                <div className="mt-6 w-full max-w-md px-4 md:px-0" dir="rtl">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        بەستەری گۆرانی (ئارەزومەندانەیە)
                    </label>
                    <input
                        type="url"
                        value={musicLink}
                        onChange={(e) => setMusicLink(e.target.value)}
                        placeholder="https://youtube.com/..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-purple-500 focus:outline-none placeholder:text-right"
                        dir="ltr"
                    />
                </div>

                <button
                    onClick={handleSend}
                    className="mt-6 bg-gradient-to-r from-rose-500 to-pink-500 font-serif text-white font-bold py-3 px-8 rounded-lg hover:bg-purple-700 transition-colors"
                >
                    پەیامەکە بنێرە
                </button>

                <div className="flex flex-col gap-8 justify-center items-center p-12">
                    <div className="flex flex-col items-center gap-4 text-gray-600">
                        <span className="font-bold text-xl">لیمینا#</span>
                        <span className="font-bold text-sm">پەیامەکەت لەم پلاتفۆرمانە ببینە</span>
                    </div>
                    <div className="flex gap-3">
                        <a href="https://instagram.com/yourinstagram" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="text-2xl text-pink-600 hover:text-pink-800" />
                        </a>
                        <a href="https://tiktok.com/@yourtiktok" target="_blank" rel="noopener noreferrer">
                            <FaTiktok className="text-2xl text-black hover:text-gray-700" />
                        </a>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}