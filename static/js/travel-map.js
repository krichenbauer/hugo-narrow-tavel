(function () {
  var mapEl = document.getElementById("travel-map");
  if (!mapEl || typeof L === "undefined") {
    return;
  }

  function markerColorFor(item) {
    var category = (item.primaryCategory || "").toLowerCase();
    // Colorblind-safe palette inspired by Okabe-Ito colors.
    var palette = {
      area: "#0072b2",
      sightseeing: "#e69f00",
      viewpoint: "#56b4e9",
      food: "#d55e00",
      restaurant: "#cc79a7",
    };
    return palette[category] || "#444444";
  }

  function markerRadiusFor(item) {
    return item.type === "area" ? 11 : 8;
  }

  function markerBorderFor(item) {
    return item.type === "area" ? 3 : 2;
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

        var color = markerColorFor(item);

        var summary = item.summary ? "<p>" + item.summary + "</p>" : "";
        var district = item.district ? "<p><strong>Stadtteil:</strong> " + item.district + "</p>" : "";
        var categories = Array.isArray(item.categories) && item.categories.length
          ? "<p><strong>Kategorien:</strong> " + item.categories.join(", ") + "</p>"
          : "";
        var thumb = item.thumbnail
          ? '<img src="' + item.thumbnail + '" alt="' + item.title + '" loading="lazy" decoding="async">'
          : "";

        var linkLabel = item.type === "area" ? "Gebiet ansehen" : "Ort ansehen";

        var popupHtml = [
          '<article class="travel-popup">',
          '<h3>' + item.title + '</h3>',
          thumb,
          summary,
          categories,
          district,
          '<p><a href="' + item.permalink + '">' + linkLabel + '</a></p>',
          "</article>",
        ].join("");

        L.circleMarker([lat, lon], {
          radius: markerRadiusFor(item),
          color: "#ffffff",
          weight: markerBorderFor(item),
          fillColor: color,
          fillOpacity: 0.95,
        }).addTo(map).bindPopup(popupHtml);
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
