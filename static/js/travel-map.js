(function () {
  var mapEl = document.getElementById("travel-map");
  if (!mapEl || typeof L === "undefined") {
    return;
  }

  function markerColorFor(item) {
    var category = item.type === "daytrip" ? "daytrip" : (item.primaryCategory || "").toLowerCase();
    // Colorblind-safe palette inspired by Okabe-Ito colors.
    var palette = {
      area: "#0072b2",
      daytrip: "#cc79a7",
      sightseeing: "#e69f00",
      viewpoint: "#56b4e9",
      museum: "#009e73",
      park: "#f0e442",
      food: "#d55e00",
    };
    return palette[category] || "#444444";
  }

  function markerRadiusFor(item) {
    return item.type === "area" ? 11 : 8;
  }

  function markerBorderFor(item) {
    return item.type === "area" ? 3 : 2;
  }

  // The initial view comes from params.map; day trips appear when zooming out.
  var dataUrl = window.travelMapDataUrl || "/map/index.json";
  var map = L.map(mapEl, {
    scrollWheelZoom: true,
    zoomControl: false,
  }).setView(window.travelMapCenter || [0, 0], window.travelMapZoom || 12);

  // Keep area markers behind place markers when coordinates overlap.
  map.createPane("areasPane");
  map.getPane("areasPane").style.zIndex = 450;
  map.createPane("placesPane");
  map.getPane("placesPane").style.zIndex = 500;

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
      items.forEach(function (item) {
        var lat = Number(item.latitude);
        var lon = Number(item.longitude);
        if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
          return;
        }

        var color = markerColorFor(item);

        var summary = item.summary ? "<p>" + item.summary + "</p>" : "";
        var area = item.area ? "<p><strong>Gebiet:</strong> " + item.area + "</p>" : "";
        var categories = Array.isArray(item.categories) && item.categories.length
          ? "<p><strong>Kategorien:</strong> " + item.categories.join(", ") + "</p>"
          : "";
        var thumb = item.thumbnail
          ? '<img src="' + item.thumbnail + '" alt="' + item.title + '" loading="lazy" decoding="async">'
          : "";

        var linkLabel = { area: "Gebiet ansehen", daytrip: "Ausflug ansehen" }[item.type] || "Ort ansehen";

        var popupHtml = [
          '<article class="travel-popup">',
          '<h3>' + item.title + '</h3>',
          thumb,
          summary,
          categories,
          area,
          '<p><a href="' + item.permalink + '">' + linkLabel + '</a></p>',
          "</article>",
        ].join("");

        // Day trips are squares; areas and places are circles.
        var marker = item.type === "daytrip"
          ? L.marker([lat, lon], {
              pane: "placesPane",
              icon: L.divIcon({ className: "travel-map-daytrip", iconSize: [16, 16] }),
            })
          : L.circleMarker([lat, lon], {
              pane: item.type === "area" ? "areasPane" : "placesPane",
              radius: markerRadiusFor(item),
              color: "#ffffff",
              weight: markerBorderFor(item),
              fillColor: color,
              fillOpacity: 0.95,
            });
        marker.addTo(map).bindPopup(popupHtml);
      });
    })
    .catch(function () {
      // Keep a usable base map even if marker data cannot be loaded.
    });
})();
