import React from 'react';
import { useRouteError, isRouteErrorResponse, Link } from 'react-router';
import { ArrowRightIcon } from '../components/Icons';

export const ErrorPage: React.FC = () => {
  const error = useRouteError();

  let title = "404 — Page Not Found";
  let message = "The requested resource could not be found or has moved.";

  if (isRouteErrorResponse(error)) {
    title = `${error.status} — ${error.statusText || 'Error'}`;
    message = error.data?.message || message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="error-page-container">
      <div className="error-card">
        <div className="error-tag">
          <span className="tag-mono">ROUTER EXCEPTION</span>
        </div>
        <h1 className="error-title">{title}</h1>
        <p className="error-desc">{message}</p>
        <div className="error-actions">
          <Link to="/" className="btn btn-primary">
            <span>Return to Overview</span>
            <ArrowRightIcon size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
};
