// ==========================================================================
//  Theme toggle (dark / light) + language toggle (EN / 中文)
//  Plain vanilla JS, no dependencies. Preferences persist in localStorage.
// ==========================================================================

(function () {
  var root = document.documentElement;

  // ---------- Theme ----------
  var themeIcon = document.querySelector("#theme-toggle i");

  function applyTheme(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
    } else {
      root.removeAttribute("data-theme");
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
    }
  }

  // Sync the icon with whatever the pre-paint inline script already applied.
  applyTheme(root.getAttribute("data-theme") === "dark" ? "dark" : "light");

  document.getElementById("theme-toggle").addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    localStorage.setItem("theme", next);
    applyTheme(next);
  });

  // Follow system changes only when the user hasn't picked a theme manually.
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
    if (!localStorage.getItem("theme")) applyTheme(e.matches ? "dark" : "light");
  });

  // ---------- Language ----------
  // Every translatable element carries data-en and/or data-zh attributes.
  var langNodes = document.querySelectorAll("[data-en], [data-zh]");

  function applyLang(lang) {
    root.setAttribute("lang", lang);
    root.setAttribute("data-lang", lang);
    langNodes.forEach(function (node) {
      var text = node.getAttribute("data-" + lang);
      if (text !== null) node.textContent = text;
    });
  }

  applyLang(localStorage.getItem("lang") || "en");

  document.getElementById("lang-toggle").addEventListener("click", function () {
    var next = root.getAttribute("data-lang") === "zh" ? "en" : "zh";
    localStorage.setItem("lang", next);
    applyLang(next);
  });

  // ---------- Live weather (Open-Meteo, Xi'an) ----------
  // WMO weather codes -> emoji + bilingual label.
  var WMO = {
    0:  ["☀️", "Clear sky", "晴"],
    1:  ["🌤️", "Mainly clear", "晴间多云"],
    2:  ["⛅", "Partly cloudy", "多云"],
    3:  ["☁️", "Overcast", "阴"],
    45: ["🌫️", "Fog", "雾"],
    48: ["🌫️", "Rime fog", "雾凇"],
    51: ["🌦️", "Light drizzle", "小毛雨"],
    53: ["🌦️", "Drizzle", "毛雨"],
    55: ["🌦️", "Dense drizzle", "浓毛雨"],
    61: ["🌧️", "Light rain", "小雨"],
    63: ["🌧️", "Rain", "中雨"],
    65: ["🌧️", "Heavy rain", "大雨"],
    71: ["🌨️", "Light snow", "小雪"],
    73: ["🌨️", "Snow", "中雪"],
    75: ["❄️", "Heavy snow", "大雪"],
    80: ["🌦️", "Rain showers", "阵雨"],
    81: ["🌦️", "Rain showers", "阵雨"],
    82: ["⛈️", "Violent showers", "强阵雨"],
    95: ["⛈️", "Thunderstorm", "雷阵雨"],
    96: ["⛈️", "Thunderstorm", "雷阵雨"],
    99: ["⛈️", "Thunderstorm", "强雷阵雨"]
  };

  function refresh(node, en, zh) {
    if (en !== null) node.setAttribute("data-en", en);
    if (zh !== null) node.setAttribute("data-zh", zh);
    node.textContent = node.getAttribute("data-" + root.getAttribute("data-lang"));
  }

  // Fetch + render weather for a given location.
  function loadWeather(lat, lon, placeEn, placeZh) {
    var loc = document.querySelector("#weather-widget .widget__loc");
    if (placeEn) refresh(loc, placeEn, placeZh || placeEn);

    fetch("https://api.open-meteo.com/v1/forecast?latitude=" + lat +
          "&longitude=" + lon + "&current=temperature_2m,weather_code")
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var c = data.current;
        var info = WMO[c.weather_code] || ["🌡️", "—", "—"];
        document.getElementById("weather-icon").textContent = info[0];
        document.getElementById("weather-temp").textContent = Math.round(c.temperature_2m) + "°C";
        refresh(document.getElementById("weather-desc"), info[1], info[2]);
      })
      .catch(function () {
        document.getElementById("weather-icon").textContent = "🌐";
        refresh(document.getElementById("weather-desc"), "Unavailable", "暂不可用");
      });
  }

  // Try IP-based geolocation; fall back to Xi'an (34.34 N, 108.94 E) on failure.
  fetch("https://get.geojs.io/v1/ip/geo.json")
    .then(function (r) { return r.json(); })
    .then(function (geo) {
      if (geo && geo.latitude && geo.longitude) {
        loadWeather(geo.latitude, geo.longitude, geo.city || "", geo.city || "");
      } else {
        loadWeather(34.34, 108.94, null, null);
      }
    })
    .catch(function () {
      loadWeather(34.34, 108.94, null, null);
    });

  // ---------- Daily quote (Hitokoto), locked per day ----------
  var quoteText = document.getElementById("quote-text");
  var quoteFrom = document.getElementById("quote-from");
  var quoteDate = document.getElementById("quote-date");

  // Local date key like "2026-06-17" (uses the visitor's own timezone).
  var d = new Date();
  var today = d.getFullYear() + "-" +
    String(d.getMonth() + 1).padStart(2, "0") + "-" +
    String(d.getDate()).padStart(2, "0");

  // Show the quote AND the date it belongs to, so the two never desync
  // (e.g. when a new-day fetch fails and we fall back to yesterday's quote).
  function showQuote(q) {
    refresh(quoteText, q.text, q.text);
    quoteFrom.textContent = q.from || "";
    if (q.date) quoteDate.textContent = q.date;
  }

  var cached = null;
  try { cached = JSON.parse(localStorage.getItem("dailyQuote")); } catch (e) {}

  if (cached && cached.date === today) {
    showQuote(cached);
  } else {
    fetch("https://v1.hitokoto.cn/?c=d&c=i&c=k&encode=json")
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var from = data.from_who ? data.from_who + "《" + data.from + "》" : data.from;
        var q = { date: today, text: data.hitokoto, from: from || "" };
        localStorage.setItem("dailyQuote", JSON.stringify(q));
        showQuote(q);
      })
      .catch(function () {
        // Fall back to yesterday's quote if we have one; otherwise show an error.
        if (cached) showQuote(cached);
        else refresh(quoteText, "Unavailable", "暂不可用");
      });
  }
})();
