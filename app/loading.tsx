export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950">
            <div className="relative flex flex-col items-center">
                {/* Brand Name */}
                <h1 className="text-4xl font-bold gradient-text mb-8 animate-pulse">
                    LahiruX
                </h1>

                {/* Spinner */}
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />

                    {/* Inner Glow */}
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
                </div>

                {/* Loading Text */}
                <p className="mt-6 text-gray-400 text-sm animate-pulse">
                    Loading...
                </p>
            </div>
        </div>
    );
}
