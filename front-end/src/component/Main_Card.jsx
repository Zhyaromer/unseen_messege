import "../index.css";

export default function Main_Card({ id, name, message, videoTitle, videoThumbnail, videoUrl }) {
    const isAvailable = videoTitle !== null && videoThumbnail !== null && videoUrl !== null;

    const handleCardClick = (e) => {
        if (!e.target.closest(`[data-yt-section]`)) {
            window.location.href = `/messege/${id}`;
        }
    }

    const handleYTClick = (e) => {
        e.stopPropagation();
        window.open(videoUrl, '_blank');
    }

    return (
        <div dir="rtl" onClick={handleCardClick}>
            <div className="md:w-96 h-[470px] border-4 border-black text-lg flex flex-col">
                <div className="flex justify-between items-center px-3 py-0 bg-white">
                    <div className="flex items-center gap-2">
                        <span className="font-bold">بۆ : {name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <img className="w-12 h-12" src="https://www.svgrepo.com/show/37899/email-black-envelope-back.svg" alt="" />
                    </div>
                </div>

                <div className="px-2 bg-white flex-grow">
                    <div className="bg-purple-200 p-2 text-2xl leading-relaxed h-full">
                        <p className="text-black font-semibold">{message}</p>
                    </div>
                </div>

                <div
                    data-yt-section
                    onClick={handleYTClick}
                    dir="rtl"
                    className={`${!isAvailable ? 'hidden' : ''} ${videoUrl ? 'cursor-pointer' : ''}`}
                >
                    <div >
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <img
                                className="w-16 h-12 rounded object-cover"
                                src={videoThumbnail}
                                alt="Video thumbnail"
                            />
                            <div>
                                <p className="text-sm font-medium text-gray-900">{videoTitle}</p>
                                <a
                                    href={videoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-blue-600 hover:text-blue-800"
                                >
                                    بینینی ڤیدیۆ
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center items-center p-3 bg-white font-bold">
                    <span className="text-gray-600">لیمینا#</span>
                </div>
            </div>
        </div>
    )
}