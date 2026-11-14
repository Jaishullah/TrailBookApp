import {read, write} from './storage.js';

export async function passwordDigest(password, salt) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({
    name: 'PBKDF2', salt: encoder.encode(salt), iterations: 600000, hash: 'SHA-256'
  }, key, 256);
  return Array.from(new Uint8Array(bits), byte => byte.toString(16).padStart(2, '0')).join('');
}

export function signupScreen() {
  return `<main class="auth"><p class="eyebrow">Your trail journal</p><h1>Create an account</h1><p>Save trails and keep your hiking plans in one place.</p>
  <form id="signup" novalidate><label>Username<input name="username" autocomplete="username"></label>
  <label>Email<input name="email" type="email" autocomplete="email"></label>
  <label>Password<input name="password" type="password" autocomplete="new-password"><small>Use at least 8 characters.</small></label>
  <div id="feedback" role="alert"></div><button>Sign up</button></form><p>Already registered? <a href="#login">Log in</a></p></main>`;
}

export async function register(form) {
  const username = form.username.value.trim();
  const email = form.email.value.trim().toLowerCase();
  const password = form.password.value;
  if (!username || !email || !form.email.validity.valid) throw new Error('Enter a username and a valid email address.');
  if (password.length < 8) throw new Error('Password must be at least 8 characters.');
  if (read('account.' + email)) throw new Error('An account already exists for this email.');
  const salt = crypto.randomUUID();
  const digest = await passwordDigest(password, salt);
  write('account.' + email, {username, salt, digest});
  write('session', email);
}
