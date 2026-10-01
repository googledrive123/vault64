/* GameDistribution SDK stub: no ads; showAd resolves at once and fires the pause/start events games wait for. */
(function () {
  function fire(name) {
    try { var o = window.GD_OPTIONS || {}; if (typeof o.onEvent === 'function') o.onEvent({ name: name, message: name, status: 'success' }); } catch (e) {}
  }
  var done = function () { return Promise.resolve(); };
  var sdk = {
    showAd: function (type) {
      fire('SDK_GAME_PAUSE');
      return new Promise(function (res) {
        setTimeout(function () {
          if (type === 'rewarded') fire('SDK_REWARDED_WATCH_COMPLETE');
          fire('SDK_GAME_START');
          res();
        }, 0);
      });
    },
    showBanner: function () {}, preloadAd: done, preloadRewarded: done, cancelAd: done, openConsole: function () {},
    AdType: { Rewarded: 'rewarded', Interstitial: 'interstitial', Preroll: 'interstitial', Midroll: 'interstitial', Display: 'display' }
  };
  var proxied = typeof Proxy === 'undefined' ? sdk : new Proxy(sdk, {
    get: function (t, k) { return k in t ? t[k] : (typeof k === 'string' && k !== 'then' ? done : undefined); }
  });
  window.gdsdk = proxied;
  window.gdApi = window.gdApi || proxied;
  setTimeout(function () { fire('SDK_READY'); fire('SDK_GAME_START'); }, 0);
})();
