import {account, preferences, write} from './storage.js';

export function settingsScreen() {
  return `<main><a href="#menu">← Settings menu</a><h1>Preferences</h1><form id="settings" class="panel">
  <label>Distance units<select name="units"><option value="metric">Kilometers (km)</option><option value="imperial" ${preferences().units === 'imperial' ? 'selected' : ''}>Miles (mi)</option></select></label>
  <button>Save preferences</button><div id="feedback" role="status"></div></form></main>`;
}

export function saveSettings(units) {
  write('preferences.' + account(), {...preferences(), units});
}
