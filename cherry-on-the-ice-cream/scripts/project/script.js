async function loadScript(scriptUrl, scriptType = "text/javascript")
{
    return new Promise((resolve, reject) =>
    {
        const script = document.createElement("script");

        script.async = true;
        script.defer = true;
        script.src = scriptUrl;
        script.type = scriptType;

        script.onload = () => resolve();
        script.onerror = () => reject();

        document.body.appendChild(script);
    });
}

loadScript("_ext/ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js")
	.then(() => loadScript("cmg-ads-stub.js"));


runOnStartup(async (runtime) =>
{
	window.addEventListener(
  "keydown",
  function (e) {
    if (
      ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
        e.code
      ) > -1
    ) {
      e.preventDefault();
    }
  },
  false
);


	document.addEventListener("adBreakStart",() => {
		runtime.callFunction("SDK_CoolMath_AD_start");
	});
	document.addEventListener("adBreakComplete",() => {
		runtime.callFunction("SDK_CoolMath_AD_end");
	});
});






