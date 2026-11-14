import {favorites, preferences} from './storage.js';

export function detailScreen(trail) {
  const saved = favorites().includes(trail.id);
  const distance = preferences().units === 'imperial' ? (trail.km * 0.621371).toFixed(1) + ' mi' : trail.km + ' km';
  return `<main><a href="#home">← Explore</a><section class="hero"><p class="eyebrow">${trail.location}</p><h2>${trail.name}</h2></section>
  <div class="panel metrics"><span><strong>${distance}</strong><small>Distance</small></span><span><strong>${trail.grade}</strong><small>Difficulty</small></span><span><strong>${trail.duration}</strong><small>Time</small></span></div>
  <h2>About the trail</h2><p>${trail.description}</p><button id="favorite" aria-pressed="${saved}">${saved ? 'Remove from saved trails' : 'Save trail'}</button><a class="button secondary" href="#weather/${trail.id}">Trail weather</a></main>`;
}
