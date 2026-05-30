const Skeleton = ({ className = "", variant = "default" }: { className?: string; variant?: "default" | "circle" | "text" }) => {
    const baseClasses = "animate-pulse bg-slate-800";

    const variantClasses = {
        default: "rounded-lg",
        circle: "rounded-full",
        text: "rounded h-4",
    };

    return (
        <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} />
    );
};

export const ProjectSkeleton = () => (
    <div className="card overflow-hidden border border-gray-800">
        <Skeleton className="h-48 w-full rounded-none" />
        <div className="p-6 space-y-3">
            <Skeleton className="h-6 w-3/4" variant="text" />
            <Skeleton className="h-4 w-full" variant="text" />
            <Skeleton className="h-4 w-5/6" variant="text" />
            <div className="flex gap-2 mt-4">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-16" />
            </div>
        </div>
    </div>
);

export const SkillSkeleton = () => (
    <div className="card p-4 flex items-center gap-3">
        <Skeleton className="w-8 h-8" variant="circle" />
        <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-24" variant="text" />
            <Skeleton className="h-3 w-16" variant="text" />
        </div>
    </div>
);

export const ExperienceSkeleton = () => (
    <div className="card p-6 space-y-3">
        <Skeleton className="h-4 w-16" variant="text" />
        <Skeleton className="h-6 w-48" variant="text" />
        <Skeleton className="h-4 w-32" variant="text" />
        <Skeleton className="h-4 w-full" variant="text" />
        <Skeleton className="h-4 w-5/6" variant="text" />
    </div>
);

export default Skeleton;
