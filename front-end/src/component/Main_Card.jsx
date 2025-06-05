import "../index.css";

export default function Main_Card({ id, name, message }) {
    return (
        <div dir="rtl" onClick={() => location.href = `/card/${id}`}>
            <div className="md:w-96 h-96 border-4 border-black text-lg flex flex-col">
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

                {/* <div>
                    <div className="flex justify-right gap-2 items-center px-3 py-2 bg-white">
                        <div>
                            <img className="w-12 h-12 rounded-full" src="https://i.ytimg.com/vi/3-NTv0CdFCk/hqdefault.jpg?sqp=-oaymwEmCKgBEF5IWvKriqkDGQgBFQAAiEIYAdgBAeIBCggYEAIYBjgBQAE=&rs=AOn4CLAXq4hunFnadFDYg_VCySVN0d_jgg" alt="" />
                        </div>
                        <div className="text-gray-500 text-sm">
                            <span>بەروار </span>
                        </div>
                    </div>
                </div> */}

                <div className="flex justify-center items-center p-3 bg-white font-bold">
                    <span className="text-gray-600">لیمینا#</span>
                </div>
            </div>
        </div>
    )
}