import { useEffect, useState, useRef } from "react";

interface LoadingWrapperProps {
    [key: string]: any;
    loadingProps?: string[];
    children: (props: any) => JSX.Element;
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ children, loadingProps = [], ...props }) => {
    const [loading, setLoading] = useState(false);
    const [internalProps, setInternalProps] = useState(props);
    const prevPropsRef = useRef(props);

    useEffect(() => {
        const hasChanged = loadingProps.some(
            key => props[key] !== prevPropsRef.current[key]
        );

        if (hasChanged) {
            setLoading(true);
            setTimeout(() => {
                setInternalProps(props);
                setLoading(false);
                prevPropsRef.current = props;
            }, 500);
        }
    }, [props, loadingProps]);

    return loading ? <div className="loading-spinner">در حال بارگذاری...</div> : children(internalProps);
};

export default LoadingWrapper;
