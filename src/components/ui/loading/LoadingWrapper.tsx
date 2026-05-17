import { useEffect, useRef, useState } from "react";

interface LoadingWrapperProps {
  [key: string]: unknown;
  loadingProps?: string[];
  children: (props: Record<string, unknown>) => React.ReactNode;
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({
  children,
  loadingProps = [],
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  const [internalProps, setInternalProps] = useState<Record<string, unknown>>(props);
  const prevPropsRef = useRef<Record<string, unknown>>(props);

  useEffect(() => {
    const hasChanged = loadingProps.some(
      (key) => props[key] !== prevPropsRef.current[key],
    );

    if (hasChanged) {
      setLoading(true);
      const timeoutId = window.setTimeout(() => {
        setInternalProps(props);
        setLoading(false);
        prevPropsRef.current = props;
      }, 500);

      return () => window.clearTimeout(timeoutId);
    }
  }, [props, loadingProps]);

  return loading ? (
    <div className="loading-spinner">در حال بارگذاری...</div>
  ) : (
    children(internalProps)
  );
};

export default LoadingWrapper;
