import React, { useState } from "react";

import { getDatabase, ref, push, set, onValue } from "firebase/database";

export default function SearchResult({ searchResult }) {
  const db = getDatabase();
  const commentsRef = ref(db, `comments/${searchResult.id}`);

  const [showingComments, setShowingComments] = useState(false);
  const [comments, setComments] = useState([]);

  function getComments() {
    setShowingComments(!showingComments);

    onValue(commentsRef, (snapshot) => {
      const commentsObj = snapshot.val();
      const commentsArr = [];

      for (const comment in commentsObj) {
        commentsArr.push(commentsObj[comment]);
      }

      setComments(commentsArr);
    });
  }

  function addComment() {
    const text = prompt("Add a comment");

    set(push(commentsRef), {
      userId: "",
      text,
    });
  }

  return (
    <div className='component-SearchResult'>
      <h4 className='component-SearchResult__title'>{searchResult.title}</h4>

      <img
        src={`https://image.tmdb.org/t/p/original${searchResult.poster_path}`}
        alt='Movie poster'
      />

      <h5 className='component-SearchResult__overview'>
        {searchResult.overview}
      </h5>

      <h5 className='component-SearchResult__vote_average'>
        {searchResult.vote_average}
      </h5>

      <div className='component-SearchResult__comments'>
        <button onClick={getComments}>View Comments</button>
        {showingComments && (
          <div>
            {comments.length ? (
              <ul>
                {comments.map((comment, i) => (
                  <li key={i}>{comment.text}</li>
                ))}
              </ul>
            ) : (
              <p>No comments yet...</p>
            )}
            <button onClick={addComment}>Add Comment</button>
          </div>
        )}
      </div>
    </div>
  );
}
