import React from 'react';
import { useParams, Link } from 'react-router';
 
export default function PostDetailPage({ messages }) {
  const { id } = useParams();
  const post = messages.find(function(msg) {
    return String(msg.id) === id;
  });
 
  if (!post) {
    return (
      <main>
        <section className="page-intro">
          <h1>Post not found</h1>
          <Link to="/community">← Back to Community</Link>
        </section>
      </main>
    );
  }
 
  return (
    <main>
      <section className="page-intro">
        <h1>Post by {post.sender}</h1>
 
        {post.img ? (
          <img
            src={post.img}
            alt={post.alt}
            className="chat-inline-image"
          />
        ) : null}
 
        <p>{post.text}</p>
 
        <Link to="/community">← Back to Community</Link>
      </section>
    </main>
  );
}