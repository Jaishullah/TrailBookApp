export function read(key, fallback = null) {
  const value = localStorage.getItem('trailbook.' + key);
  return value === null ? fallback : JSON.parse(value);
}

export function write(key, value) {
  localStorage.setItem('trailbook.' + key, JSON.stringify(value));
}

export function account() {
  return read('session');
}

export function preferences() {
  return read('preferences.' + account(), { units: 'metric', alerts: false });
}

export function favorites() {
  return read('favorites.' + account(), []);
}

export function toggleFavorite(id) {
  const saved = favorites();
  write('favorites.' + account(), saved.includes(id) ? saved.filter(item => item !== id) : [...saved, id]);
}
