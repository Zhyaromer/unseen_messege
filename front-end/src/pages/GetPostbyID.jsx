import { useState, useEffect } from 'react';
import "../index.css";
import Main_Card from "../component/Main_Card.jsx";
import Nav from "../component/Nav.jsx";
import Footer from "../component/Footer.jsx";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaInstagram, FaTiktok } from "react-icons/fa";

export default function GetPostByID() {
    const { id } = useParams();
    const navgation = useNavigate();
    const [message, setMessage] = useState(null);

    if (!id) {
        return navgation.navigate('/');
    }

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/post/get_specified_messege?id=${id}`);
                if (response.data.length == 0 || !response.data[0] || response.status !== 200) {
                    return navgation.navigate('/');
                }
                setMessage(response.data[0]);
            } catch (error) {
                console.error('Error fetching message:', error);
            }
        };

        fetchMessage();
    }, [id]);

    return (
        <div>
            <Nav />
            <div className='container mx-auto px-4 py-8 relative z-0'>
                <div className="max-w-md mx-auto">
                    <div className="flex flex-col items-center justify-center mb-8">
                        <Main_Card id={id} name={message ? message.name : ''} message={message ? message.message : ''} videoTitle={message ? message.videoTitle : ''} videoThumbnail={message ? message.videoThumbnail : ''} videoUrl={message ? message.link : ''} />
                    </div>

                    <div dir='rtl' className="flex flex-col w-full gap-2">
                        <div>
                            <h1 className="text-xl font-bold text-black text-right">{message ? message.name : ''}</h1>
                        </div>
                        <div>
                            <span className="text-gray-500 text-md text-right">
                                بەرواری بڵاوکردنەوە{" "}
                                {message?.date
                                    ? `${new Date(message.date).getDate()}/${new Date(message.date).getMonth() + 1}/${new Date(message.date).getFullYear()}`
                                    : ''}
                            </span>
                        </div>
                        <div>
                            <p className="text-lg text-gray-700 mt-2 font-semibold text-right">{message ? message.message : ''}</p>
                        </div>
                    </div>

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
            </div>
            <Footer />
        </div>
    );
}