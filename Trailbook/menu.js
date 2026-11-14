export function menuScreen() {
  return `<main><p class="eyebrow">Account</p><h1>Settings menu</h1>
  <a class="row" href="#settings"><span><strong>Preferences</strong><small>Distance units</small></span><b>›</b></a>
  <a class="row" href="#notifications"><span><strong>Notifications</strong><small>Configure and send a test alert</small></span><b>›</b></a>
  <a class="row" href="#favorites"><span><strong>Saved trails</strong><small>View favorites</small></span><b>›</b></a>
  <button class="secondary" id="logout">Log out</button></main>`;
}
