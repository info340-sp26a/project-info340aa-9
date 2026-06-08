import React from 'react';
import { useParams, Link } from 'react-router-dom';
 
export default function PostDetailPage() {
  const { id } = useParams();
 
  return (
    <main>
      <section className="page-intro">
        <h1>Post #{id}</h1>
        <p>Post detail content will go here.</p>
        <Link to="/community">← Back to Community</Link>
      </section>
    </main>
  );
}