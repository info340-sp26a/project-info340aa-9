import React from 'react';
import { Link } from 'react-router-dom';
 
export default function NotFoundPage() {
  return (
    <main>
      <section className="page-intro">
        <h1>404</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <Link to="/">Go back to Home</Link>
      </section>
    </main>
  );
}