export default function Footer() {
    return (
        <div>
            <footer className="bg-white/80 backdrop-blur-sm py-6 mt-16 border-t border-pink-100 relative z-10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center text-center text-pink-600/60 text-sm">
                        <p>لیمینا © {new Date().getFullYear()}</p>
                    </div>
                </div>
            </footer>

            <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        .animate-float {
          animation-name: float;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
        </div>
    )
};
