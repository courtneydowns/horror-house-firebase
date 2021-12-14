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
    <form className='Signin'>
      <header>
        <h1 className='Signin__header'>Welcome to Horror House</h1>
        <h3>Sign In or Sign Up</h3>
      </header>

      <div>
        <label>
          <span>Email</span>
          <input
            type='email'
            autoComplete='username'
            onInput={(ev) => setEmail(ev.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          <span>Password</span>
          <input
            type='password'
            autoComplete='current-password'
            onInput={(ev) => setPassword(ev.target.value)}
          />
        </label>
      </div>

      <div>
        <button
          className='signin__sign-up-in-btn'
          type='button'
          onClick={isSignup ? createUser : signIn}
        >
          {isSignup ? "Sign Up" : "Sign In"}
        </button>
      </div>

      <p className='signin__instruction'>
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
  );
}
