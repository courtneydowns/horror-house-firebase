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
    <div className='searchResult'>
      <img
        src={`${searchResult.Poster}`}
        alt='Movie poster'
        className='searchResult__poster'
      />

      <h2 className='searchResult__title--heading'>Title</h2>
      <h4 className='searchResult__title'>{searchResult.Title}</h4>
      <h4 className='searchResult__plot--heading'>Plot</h4>
      <h6 className='searchResult__plot'>{searchResult.Plot}</h6>

      <h4 className='searchResult__imdbRating--heading'>IMDb Rating</h4>
      <h6 className='searchResult__imdbRating'>{searchResult.imdbRating}</h6>

      <h4 className='searchResult__released--heading'>Released</h4>
      <h6 className='searchResult__released'>{searchResult.Released}</h6>

      <h4 className='searchResult__runtime--heading'>Runtime</h4>
      <h6 className='searchResult__runtime'>{searchResult.Runtime}</h6>

      <h4 className='searchResult__director--heading'>Director</h4>
      <h6 className='searchResult__director'>{searchResult.Director}</h6>

      <h4 className='searchResult__actors--heading'>Actors</h4>
      <h6 className='searchResult__director'>{searchResult.Actors}</h6>

      {/* <img
        src={`https://image.tmdb.org/t/p/original${searchResult.poster_path}`}
        alt='Movie poster'
      /> */}

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
