# Trailbook · Yosemite Hiking Companion

Trailbook is a mobile-first browser app for browsing a sample Yosemite trail directory, saving favorites and checking trail weather. Account data and preferences live in the current browser. Use fictional credentials for this course demo.

## Run locally

From this folder, run `python -m http.server 8000` and open `http://localhost:8000`. To test on another device, host the directory over HTTPS (GitHub Pages works). Register a demo account, open a trail, save it, then reload Saved trails to check persistence.

Open a trail and select **Trail weather** to request current conditions from [Open-Meteo](https://open-meteo.com/en/docs). In **Settings → Notifications**, enable alerts and use **Send test notification**. The app shows a test alert within the page. Supported desktop browsers can also show a system notification after permission is granted.

See [USER-STORIES.md](USER-STORIES.md) and [SUBMISSION.md](SUBMISSION.md).
