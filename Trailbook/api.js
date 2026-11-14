export function weatherScreen(trail) {
  return `<main><a href="#detail/${trail.id}">← Trail details</a><p class="eyebrow">Open-Meteo</p><h1>Trail weather</h1><p>${trail.name}</p><section class="panel" id="forecast" role="status">Loading current conditions…</section><button id="refresh" class="secondary">Refresh forecast</button></main>`;
}

export async function loadWeather(trail, panel) {
  panel.textContent = 'Loading current conditions…';
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.search = new URLSearchParams({latitude: trail.lat, longitude: trail.lon, current: 'temperature_2m,wind_speed_10m,relative_humidity_2m', timezone: 'America/Los_Angeles'});
  try {
    const response = await fetch(url, {signal: AbortSignal.timeout(10000)});
    if (!response.ok) throw new Error('Forecast request failed');
    const {current, current_units: units} = await response.json();
    const rows = [['Temperature', 'temperature_2m'], ['Wind speed', 'wind_speed_10m'], ['Humidity', 'relative_humidity_2m']];
    panel.replaceChildren();
    for (const [label, key] of rows) {
      const row = document.createElement('p');
      row.textContent = label + ' · ' + current[key] + ' ' + units[key];
      panel.append(row);
    }
    const time = document.createElement('small');
    time.textContent = 'Open-Meteo · ' + current.time.replace('T', ' ') + ' local time';
    panel.append(time);
  } catch {
    panel.textContent = 'The forecast is unavailable. Check your connection and refresh.';
  }
}
