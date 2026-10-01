/* GameMonetize SDK stub: no ads; showBanner resolves at once and fires the pause/start events games wait for. */
(function () {
  function fire(name) {
    try { var o = window.SDK_OPTIONS || {}; if (typeof o.onEvent === 'function') o.onEvent({ name: name, message: name, status: 'success' }); } catch (e) {}
  }
  var noop = function () {};
  var sdk = {
    showBanner: function () {
      fire('SDK_GAME_PAUSE');
      setTimeout(function () { fire('SDK_GAME_START'); }, 0);
    },
    play: noop, pause: noop, preloadAd: function () { return Promise.resolve(); }
  };
  window.sdk = typeof Proxy === 'undefined' ? sdk : new Proxy(sdk, {
    get: function (t, k) { return k in t ? t[k] : (typeof k === 'string' && k !== 'then' ? noop : undefined); }
  });
  setTimeout(function () { fire('SDK_READY'); }, 0);
})();
