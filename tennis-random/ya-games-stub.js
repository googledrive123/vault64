/* Yandex Games SDK stand-in for this self-hosted copy: no ads, no account, no network.
   Fullscreen ads close at once, rewarded ads grant the reward, player data and stats stay in localStorage. */
(function () {
  if (window.YaGames && window.YaGames.__stub) return;
  var KEY = 'ysdk-stub:' + location.pathname;
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) {} }
  function pick(obj, keys) {
    if (!keys || !keys.length) return Object.assign({}, obj);
    var r = {};
    keys.forEach(function (k) { if (k in obj) r[k] = obj[k]; });
    return r;
  }
  function later(f) { setTimeout(f, 0); }
  function no(what) { return function () { return Promise.reject(new Error(what + ' is not available in this copy')); }; }
  var store = load();
  store.data = store.data || {};
  store.stats = store.stats || {};

  var player = {
    getName: function () { return ''; },
    getUniqueID: function () { return ''; },
    getPhoto: function () { return ''; },
    getMode: function () { return 'lite'; },
    getData: function (keys) { return Promise.resolve(pick(store.data, keys)); },
    setData: function (d) { Object.assign(store.data, d || {}); save(); return Promise.resolve(true); },
    getStats: function (keys) { return Promise.resolve(pick(store.stats, keys)); },
    setStats: function (d) { Object.assign(store.stats, d || {}); save(); return Promise.resolve(true); },
    incrementStats: function (d) {
      d = d || {};
      for (var k in d) store.stats[k] = (store.stats[k] || 0) + d[k];
      save();
      return Promise.resolve(pick(store.stats, Object.keys(d)));
    }
  };

  var payments = {
    getCatalog: function () { return Promise.resolve([]); },
    getPurchases: function () { return Promise.resolve([]); },
    purchase: no('Purchasing'),
    consumePurchase: function () { return Promise.resolve(); }
  };

  var ysdk = {
    adv: {
      showFullscreenAdv: function (o) {
        var c = (o && o.callbacks) || {};
        later(function () { if (c.onClose) c.onClose(false); });
      },
      showRewardedVideo: function (o) {
        var c = (o && o.callbacks) || {};
        later(function () {
          if (c.onOpen) c.onOpen();
          if (c.onRewarded) c.onRewarded();
          if (c.onClose) c.onClose();
        });
      },
      getBannerAdvStatus: function () { return Promise.resolve({ stickyAdvIsShowing: false }); },
      showBannerAdv: function () { return Promise.resolve({ stickyAdvIsShowing: false }); },
      hideBannerAdv: function () { return Promise.resolve({ stickyAdvIsShowing: false }); }
    },
    auth: { openAuthDialog: no('Signing in') },
    getPlayer: function () { return Promise.resolve(player); },
    getPayments: function () { return Promise.resolve(payments); },
    getLeaderboards: no('Leaderboards'),
    getStorage: function () { return Promise.resolve(window.localStorage); },
    environment: { app: { id: '' }, browser: { lang: 'en' }, i18n: { lang: 'en', tld: 'com' }, payload: null },
    deviceInfo: {
      type: 'desktop',
      isDesktop: function () { return true; }, isMobile: function () { return false; },
      isTablet: function () { return false; }, isTV: function () { return false; }
    },
    features: {
      LoadingAPI: { ready: function () {} },
      GameplayAPI: { start: function () {}, stop: function () {} }
    },
    feedback: {
      canReview: function () { return Promise.resolve({ value: false, reason: 'UNKNOWN' }); },
      requestReview: function () { return Promise.resolve({ feedbackSent: false }); }
    },
    shortcut: {
      canShowPrompt: function () { return Promise.resolve({ canShow: false }); },
      showPrompt: function () { return Promise.resolve({ outcome: 'rejected' }); }
    },
    isAvailableMethod: function () { return Promise.resolve(false); },
    serverTime: function () { return Date.now(); },
    on: function () {}, off: function () {}, dispatchEvent: function () {}
  };

  window.YaGames = { __stub: true, init: function () { return Promise.resolve(ysdk); } };
  window.Ya = window.Ya || { Context: { AdvManager: { render: function () {}, destroy: function () {} } } };
  window.ym = window.ym || function () {};
})();
