export const trails = [
  {id:'mirror-lake', name:'Mirror Lake Loop', location:'Yosemite Valley', km:8, grade:'Easy', duration:'2–3 hr', description:'Follow Tenaya Creek toward Mirror Lake, with views of the cliffs below Half Dome.', lat:37.746, lon:-119.558},
  {id:'lower-fall', name:'Lower Yosemite Fall', location:'Yosemite Valley', km:1.6, grade:'Easy', duration:'30 min', description:'A short loop through the valley forest leads to a viewpoint below Lower Yosemite Fall.', lat:37.745, lon:-119.597},
  {id:'vernal-fall', name:'Vernal Fall Footbridge', location:'Happy Isles', km:2.6, grade:'Moderate', duration:'1–2 hr', description:'Climb beside the Merced River to the footbridge for a view of Vernal Fall.', lat:37.727, lon:-119.552}
];

export function trailRow(trail) {
  return `<a class="row" href="#detail/${trail.id}"><span><strong>${trail.name}</strong><small>${trail.location} · ${trail.grade}</small></span><b aria-hidden="true">›</b></a>`;
}

export function homeScreen() {
  return `<main><p class="eyebrow">Explore Yosemite</p><h1>Find your next trail.</h1><p>Browse routes and save the hikes you want to try.</p><section class="hero"><p class="eyebrow">Featured trail</p><h2>Mirror Lake Loop</h2><p>Yosemite Valley · Easy · 2–3 hr</p><a href="#detail/mirror-lake">View trail <span aria-hidden="true">↗</span></a></section><h2>Trail directory</h2>${trails.map(trailRow).join('')}</main>`;
}
