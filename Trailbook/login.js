import {read, write} from './storage.js';
import {passwordDigest} from './signup.js';

export function loginScreen() {
  return `<main class="auth"><p class="eyebrow">Your trail journal</p><h1>Welcome back</h1><p>Log in to explore trails and see your saved hikes.</p>
  <form id="login" novalidate><label>Email<input name="email" type="email" autocomplete="email"></label>
  <label>Password<input name="password" type="password" autocomplete="current-password"></label>
  <div id="feedback" role="alert"></div><button>Log in</button></form><a class="button secondary" href="#signup">Sign up</a><p>New to Trailbook? <a href="#signup">Create an account</a></p></main>`;
}

export async function login(form) {
  const email = form.email.value.trim().toLowerCase();
  const user = read('account.' + email);
  if (!user || await passwordDigest(form.password.value, user.salt) !== user.digest) {
    throw new Error('Email or password is incorrect.');
  }
  write('session', email);
}
