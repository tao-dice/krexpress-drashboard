import React, { lazy, Suspense } from 'react';

interface Props {
  fallback: React.ReactNode | null;
  delay?: number;
}

const loadable = <T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  { fallback = null }: Props = { fallback: null },
) => {
  const LazyComponent = lazy(importFunc);

  return (props: React.ComponentProps<T>): JSX.Element => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default loadable;
