// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"app.js":[function(require,module,exports) {
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function saveToWatchList() {
  var watchList = [];
  var buttons = document.querySelectorAll("button");
  buttons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      watchList.push(event.target.value);
      localStorage.setItem("Watchlist", JSON.stringify(watchList));
      console.log(watchList);
    });
  });
}

function getTrending() {
  fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=4023134480e7ff0b27cee6e5b3c0ffd3").then(function (res) {
    return res.json();
  }).then(function (data) {
    var searchResults = data.results;
    var movieContainer = document.getElementById("movie-container");
    var randomMovie = Math.floor(Math.random() * searchResults.length);
    var featuredSection = document.getElementById("featured");
    document.getElementById("header").style.backgroundImage = "url(https://image.tmdb.org/t/p/original/".concat(searchResults[randomMovie].backdrop_path, ")");
    featuredSection.innerHTML = "\n      <div>\n      <h2>".concat(searchResults[randomMovie].title, "</h2>\n      </div>\n      <span class=\"imdb-logo-container-featured\">\n      <img class=\"imdb-logo\" src=\"https://cdn-icons-png.flaticon.com/512/5977/5977585.png\"/>\n      <p>").concat(searchResults[randomMovie].vote_average.toFixed(2), " / 10</p>\n      </span>\n      </div>\n      <p class=\"featured-overview\">").concat(searchResults[randomMovie].overview, "</p>\n      <div>\n      <button value=\"").concat(searchResults[randomMovie].id, "\" class=\"btn\"><span class=\"material-symbols-outlined icon\">\n      add_circle\n      </span>Watch Later</button>\n      </div>\n      </div>\n\n      ");

    var _iterator = _createForOfIteratorHelper(searchResults),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var movies = _step.value;
        popularity = movies.popularity.toFixed(2);
        voteAverage = movies.vote_average.toFixed(2);
        voteCount = movies.vote_count;
        releaseDate = new Date(movies.release_date).toLocaleDateString();
        movieContainer.innerHTML += "\n        <div class=\"movie-item\">\n        <img class=\"movie-poster\" src=\"https://image.tmdb.org/t/p/original/".concat(movies.poster_path, "\" />\n        <span><p class=\"release-date\">Release: ").concat(releaseDate, "</p></span>\n        <span class=\"movie-title\"><h3>").concat(movies.title, "</h3></span>\n        <div class=\"movie-stats\">\n        <span class=\"imdb-logo-container\">\n        <img class=\"imdb-logo\" src=\"https://cdn-icons-png.flaticon.com/512/5977/5977585.png\"/>\n        <p>").concat(movies.vote_average, " / 10</p>\n        </span>\n        </div>\n        <div>\n        <button value=\"").concat(movies.id, "\" class=\"btn\"><span class=\"material-symbols-outlined icon\">\n        add_circle\n        </span>Watch Later</button>\n        </div>\n        </div>\n        ");
        saveToWatchList();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  });
}

getTrending(); // * WATCHLIST //

function getWatchList() {
  var watchListContainer = document.getElementById("watchlist-container");
  var savedWatchList = JSON.parse(localStorage.getItem("Watchlist"));

  if (saveToWatchList.length === 0) {
    var header = document.getElementById("header");
    var emptyWatchListBanner = document.getElementById("empty-watchlist-banner");
    header.style.display = "none";
    emptyWatchListBanner.style.height = "100vh";
    emptyWatchListBanner.style.background = "url(https://media2.giphy.com/media/g01ZnwAUvutuK8GIQn/giphy.gif?cid=ecf05e47ipzjxq2k3a44mgfeubstqx10rblc8t63z1e20hix&rid=giphy.gif) no-repeat";
    emptyWatchListBanner.style.backgroundSize = "cover";
    emptyWatchListBanner.style.display = "block";
    emptyWatchListBanner.innerHTML = "\n    <div class=\"empty-watchlist-content\">\n    <button class=\"btn\">Go back</button>\n    <h2>Your watchlist is empty :( Try adding some movies</h2>\n    </div>\n    ";
  }

  var _iterator2 = _createForOfIteratorHelper(savedWatchList),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var movies = _step2.value;
      fetch("https://api.themoviedb.org/3/movie/".concat(movies, "?api_key=4023134480e7ff0b27cee6e5b3c0ffd3&language=en-US")).then(function (response) {
        return response.json();
      }).then(function (movies) {
        if (movies.success !== false) {
          watchListContainer.innerHTML += "\n          <div>\n          <img class=\"movie-poster\" src=\"https://image.tmdb.org/t/p/original/".concat(movies.poster_path, "\" />\n          </div>\n          <div id=\"").concat(movies.id, "\" class=\"watchlist-item\">\n          <div>\n          <span class=\"movie-title\"><h2>").concat(movies.title, "</h2></span>\n          <span>").concat(movies.production_countries[0].iso_3166_1, " / ").concat(movies.release_date, " / ").concat(movies.runtime, "min</span>\n          <span class=\"imdb-logo-container-watchlist\">\n          <img class=\"imdb-logo\" src=\"https://cdn-icons-png.flaticon.com/512/5977/5977585.png\"/>\n          <span class=\"vote-average\">").concat(movies.vote_average, "</span>\n          </span>\n          <span>\n          <h3>Overview</h3>\n          ").concat(movies.overview, "\n          </span>\n          <div>\n          <span class=\"providers-grid\"> \n          <img src=\"https://cdn-icons-png.flaticon.com/512/5977/5977590.png\"/>\n          </span>\n          </div>\n          <button class=\"btn btn-remove\" value=\"").concat(movies.id, "\"><i class=\"fa-solid fa-circle-minus icon\"></i>Remove</button>\n          </div>\n          </div>\n          ");
          deleteFromWatchList();
        }
      });
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}

getWatchList();

function deleteFromWatchList() {
  var watchListContainer = document.getElementById("watchlist-container");
  var savedWatchList = JSON.parse(localStorage.getItem("Watchlist"));
  document.querySelectorAll("DIV").forEach(function (movieItem) {
    movieItem.addEventListener("click", function (event) {
      if (event.target.tagName === "BUTTON" && event.target.value === movieItem.id) {
        var newWatchList = savedWatchList.filter(function (item) {
          return item !== event.target.value;
        });
        localStorage.setItem("Watchlist", JSON.stringify(newWatchList));
        watchListContainer.removeChild(movieItem);
      }
    });
  });
}
},{}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59835" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map