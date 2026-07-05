(function () {
  var mapEl = document.getElementById("travel-map");
  if (!mapEl || typeof L === "undefined") {
    return;
  }

  var dataUrl = window.travelMapDataUrl || "/map/index.json";
  var map = L.map(mapEl, {
    scrollWheelZoom: true,
    zoomControl: false,
  }).setView([43.0618, 141.3545], 12);

  L.control.zoom({
    zoomInTitle: "Hineinzoomen",
    zoomOutTitle: "Herauszoomen",
  }).addTo(map);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>-Mitwirkende',
  }).addTo(map);

  fetch(dataUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (items) {
      var bounds = [];

      items.forEach(function (item) {
        var lat = Number(item.latitude);
        var lon = Number(item.longitude);
        if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
          return;
        }

        var summary = item.summary ? "<p>" + item.summary + "</p>" : "";
        var district = item.district ? "<p><strong>Stadtteil:</strong> " + item.district + "</p>" : "";
        var categories = Array.isArray(item.categories) && item.categories.length
          ? "<p><strong>Kategorien:</strong> " + item.categories.join(", ") + "</p>"
          : "";
        var thumb = item.thumbnail
          ? '<img src="' + item.thumbnail + '" alt="' + item.title + '" loading="lazy" decoding="async">'
          : "";

        var popupHtml = [
          '<article class="travel-popup">',
          '<h3>' + item.title + '</h3>',
          thumb,
          summary,
          categories,
          district,
          '<p><a href="' + item.permalink + '">Ort ansehen</a></p>',
          "</article>",
        ].join("");

        L.marker([lat, lon]).addTo(map).bindPopup(popupHtml);
        bounds.push([lat, lon]);
      });

      if (bounds.length > 0) {
        map.fitBounds(bounds, { padding: [30, 30] });
      }
    })
    .catch(function () {
      // Keep a usable base map even if marker data cannot be loaded.
    });
})();
