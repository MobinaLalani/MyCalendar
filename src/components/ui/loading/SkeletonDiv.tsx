import React, { ReactNode } from 'react';
import Loading from "./Loading";

interface SkeletonDivProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    loading?: boolean;
}

function SkeletonDiv({ children, loading = true, ...rest }: SkeletonDivProps) {
    return (
        <div {...rest}>
            {loading ? (
                <Loading/>
                // <div className="w-full h-full backdrop-blur-[10px] opacity-30 bg-gray-50 transition-all animate-pulse rounded-lg" />
            ) : (
                children
            )}
        </div>
    );
}

export default SkeletonDiv;
