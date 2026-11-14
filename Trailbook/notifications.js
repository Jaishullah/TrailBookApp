import {account, preferences, write} from './storage.js';

export function notificationsScreen() {
  return `<main><a href="#menu">← Settings menu</a><h1>Notifications</h1><p>Enable trail alerts and send yourself a test.</p><div class="panel">
  <label><input id="alerts" type="checkbox" ${preferences().alerts ? 'checked' : ''}> Enable trail alerts</label>
  <button id="test-alert">Send test notification</button><div id="feedback" role="status"></div></div></main>`;
}

export function setAlerts(alerts) {
  write('preferences.' + account(), {...preferences(), alerts});
}

export async function sendTestAlert() {
  if (!preferences().alerts) throw new Error('Enable trail alerts before sending a test.');
  const title = 'Trailbook test alert';
  const body = 'Your trail alerts are working.';
  if ('Notification' in window && await Notification.requestPermission() === 'granted') {
    new Notification(title, {body});
  }
  return title + ' · ' + body;
}
