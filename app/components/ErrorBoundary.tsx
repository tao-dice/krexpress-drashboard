import React from 'react';

interface Props {
  fallback?: React.ReactNode;
  children?: React.ReactNode;
}

// Error boundaries currently have to be classes.
// @ts-ignore
class ErrorBoundary extends React.Component<Props> {
  public state = { hasError: false, error: null };

  // @ts-ignore
  public getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }
  // @ts-ignore
  public render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return '';
  }
}

export default ErrorBoundary;
