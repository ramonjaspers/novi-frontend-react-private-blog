import React from 'react';
import posts from '../data/posts.json';
import { useParams } from 'react-router-dom';

export default function BlogPost() {
  const { id } = useParams();
  const selectedPost = posts.find((post) => {
    return post.id === id;
  });

  return (
    <>
      <article>
        <h1>{selectedPost.title}</h1>
        <h2>{selectedPost.date}</h2>
        <p>{selectedPost.content}</p>
      </article>
    </>
  );
}