import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { getDatabase, ref, set } from "firebase/database";

import React, { useState } from "react";

export default function Signin() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleError(err) {
    console.error(err);
    alert(err);
  }

  async function signIn() {
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
    } catch (err) {
      handleError(err);
    }
  }

  async function createUser() {
    try {
      const { user } = await createUserWithEmailAndPassword(
        getAuth(),
        email,
        password
      );

      set(ref(getDatabase(), `users/${user.uid}`), {
        email: user.email,
      });
    } catch (err) {
      handleError(err);
    }
  }

  return (
    <div>
      <header>
        <h1 className='Signin__header'>Welcome to Horror House</h1>
      </header>
      <form className='Signin'>
        <h3 className='Signin__h3'>Signin</h3>
        <div>
          <input
            className='Signin__input'
            placeholder='email'
            type='email'
            autoComplete='username'
            onInput={(ev) => setEmail(ev.target.value)}
          />
        </div>

        <div>
          <input
            className='Signin__input'
            placeholder='password'
            type='password'
            autoComplete='current-password'
            onInput={(ev) => setPassword(ev.target.value)}
          />
        </div>

        <div>
          <button
            className='Signin__signup-btn'
            type='button'
            onClick={isSignup ? createUser : signIn}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </button>
        </div>

        <p className='Signin__instruction'>
          {!isSignup ? `Don't` : "Already"} have an account? Click{" "}
          <button
            className='Signin__button'
            type='button'
            onClick={() => setIsSignup(!isSignup)}
          >
            here
          </button>{" "}
          to sign {!isSignup ? "up" : "in"}.
        </p>
      </form>
    </div>
  );
}
