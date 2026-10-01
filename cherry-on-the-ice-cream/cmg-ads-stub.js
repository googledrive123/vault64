/* Coolmath Games ads stub: no ads; ad breaks and rewarded breaks finish at once. */
(function () {
  function done() { document.dispatchEvent(new CustomEvent('adBreakComplete')); }
  window.cmgAdBreak = function () { setTimeout(done, 0); };
  window.cmgRewardAds = function () { setTimeout(done, 0); };
  window.cmgGameEvent = window.cmgGameEvent || function () {};
})();
