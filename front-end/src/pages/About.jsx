import Nav from "../component/Nav.jsx";
import Footer from "../component/Footer.jsx";
import { FaInstagram, FaTiktok } from "react-icons/fa";

export default function About() {
    return (
        <div>
            <Nav tab="about" />
            <div dir="rtl" className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-pink-100 mt-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">دەربارەی لیمینیا</h2>
                <div className="space-y-6 text-gray-700">
                    <p className="text-2xl">
                        لیمینا وێب سایتێکی کوردیە
                        بۆ جێهێشتنی نامەیەک بە نەناسراوی، پێویستی بە هیچ داتا و زانیارییەک نییە..
                    </p>
                    <p className="text-2xl">
                        پاش ناردنی لەماوەی کەمترین کات پێداچوونەوە بۆ نامەکەت دەکرێت و وەردەگیرێت
                    </p>
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
            <Footer />
        </div>
    )
}; 