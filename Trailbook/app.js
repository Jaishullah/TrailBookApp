import {account, favorites, read, toggleFavorite, write} from './storage.js';
import {signupScreen, register} from './signup.js';
import {loginScreen, login} from './login.js';
import {homeScreen, trails, trailRow} from './home.js';
import {detailScreen} from './detail.js';
import {weatherScreen, loadWeather} from './api.js';
import {menuScreen} from './menu.js';
import {settingsScreen, saveSettings} from './settings.js';
import {notificationsScreen, setAlerts, sendTestAlert} from './notifications.js';

const root = document.querySelector('#app');
const select = selector => root.querySelector(selector);

function feedback(message, type) {
  const box = select('#feedback');
  if (box) {
    box.textContent = message;
    box.className = type;
  }
}

function bindAuth(id, action) {
  select(id).onsubmit = async event => {
    event.preventDefault();
    const button = event.submitter;
    button.disabled = true;
    try {
      await action(event.currentTarget.elements);
      location.hash = 'home';
    } catch (error) {
      feedback(error.message, 'error');
    } finally {
      button.disabled = false;
    }
  };
}

function render() {
  const [route, id] = location.hash.slice(1).split('/');
  const signedIn = Boolean(account());
  const page = signedIn ? route : route === 'signup' ? 'signup' : 'login';
  const trail = trails.find(item => item.id === id) ?? trails[0];
  const screens = {
    login: loginScreen, signup: signupScreen, home: homeScreen, detail: () => detailScreen(trail),
    weather: () => weatherScreen(trail), menu: menuScreen, settings: settingsScreen,
    notifications: notificationsScreen, favorites: () => {
      const saved = trails.filter(item => favorites().includes(item.id));
      return `<main><p class="eyebrow">Your collection</p><h1>Saved trails</h1><p>Find your bookmarked hikes here.</p>${saved.length ? saved.map(trailRow).join('') : '<p>No saved trails yet.</p>'}</main>`;
    }
  };
  const screen = signedIn && ['login','signup'].includes(page) ? homeScreen : (screens[page] ?? homeScreen);
  root.innerHTML = `<header><a href="#home"><strong>▲ Trailbook</strong></a>${signedIn ? '<a href="#menu" aria-label="Settings menu">⚙</a>' : ''}</header>${screen()}${signedIn ? '<nav aria-label="Main navigation"><a href="#home">Explore</a><a href="#favorites">Saved trails</a><a href="#menu">Settings</a></nav>' : ''}`;
  if (select('#signup')) bindAuth('#signup', register);
  if (select('#login')) bindAuth('#login', login);
  if (select('#favorite')) select('#favorite').onclick = () => { toggleFavorite(trail.id); render(); select('#favorite').focus(); };
  if (select('#forecast')) {
    const refresh = () => loadWeather(trail, select('#forecast'));
    select('#refresh').onclick = refresh;
    refresh();
  }
  if (select('#logout')) select('#logout').onclick = () => { write('session', null); location.hash = 'login'; render(); };
  if (select('#settings')) select('#settings').onsubmit = event => {
    event.preventDefault();
    saveSettings(event.currentTarget.elements.units.value);
    feedback('Preferences saved.', 'notice');
  };
  if (select('#alerts')) select('#alerts').onchange = event => setAlerts(event.target.checked);
  if (select('#test-alert')) select('#test-alert').onclick = async () => {
    try { feedback(await sendTestAlert(), 'notice'); }
    catch (error) { feedback(error.message, 'error'); }
  };
}

addEventListener('hashchange', () => { render(); scrollTo(0, 0); });
render();
