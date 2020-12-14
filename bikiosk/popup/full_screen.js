
console.log("biKiosk : popup/full_screen.js is loading...");

/**
 * send a "full_screen" message to the background script.
 */
function full_screen()
{
  //console.log("biKiosk : send event : full_screen");
  browser.runtime.sendMessage({ command: "full-screen" });
}


/**
 * send a "ff_reload" message to the background script.
 */
function ff_reload()
{
  console.log("biKiosk : send event : ff_reload");
  //browser.runtime.sendMessage({ command: "ff-reload" });
}


document.querySelector("#full-screen").addEventListener('click', full_screen );
document.querySelector("#ff-reload").addEventListener('click', ff_reload );


console.log("biKiosk : popup/full_screen.js wass loaded");

