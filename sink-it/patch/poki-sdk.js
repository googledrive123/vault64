/* no-op PokiSDK: ads resolve at once, rewarded breaks grant the reward */
(function () {
  var noop = function () {};
  var ok = function (v) { return function () { return Promise.resolve(v); }; };
  var sdk = {
    init: ok(), initWithVideoHB: ok(), commercialBreak: ok(), rewardedBreak: ok(true),
    getLeaderboard: ok([]), shareableURL: ok(location.href), getSharableURL: ok(location.href),
    getURLParam: function (k) { return new URLSearchParams(location.search).get(k) || ''; },
    isAdBlocked: function () { return false; }
  };
  ['disableProgrammatic', 'gameLoadingStart', 'gameLoadingFinished', 'gameInteractive', 'roundStart',
   'roundEnd', 'muteAd', 'setDebug', 'gameplayStart', 'gameplayStop', 'gameLoadingProgress', 'happyTime',
   'setPlayerAge', 'togglePlayerAdvertisingConsent', 'toggleNonPersonalized', 'setConsentString', 'logError',
   'sendHighscore', 'setDebugTouchOverlayController', 'customEvent', 'displayAd', 'destroyAd',
   'setLogging', 'enableEventTracking', 'measure', 'captureError'].forEach(function (k) { sdk[k] = noop; });
  window.PokiSDK = typeof Proxy === 'undefined' ? sdk : new Proxy(sdk, {
    get: function (t, k) { return k in t ? t[k] : (typeof k === 'string' && k !== 'then' ? noop : undefined); }
  });
})();
