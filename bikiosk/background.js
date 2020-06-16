'use strict';

//console.log("biKiosk : background_script.js is loading...");

// Put all the javascript code here, that you want to execute in background.
function ffSetFullscreen ()
{
  //First get the actual window
  browser.windows.getCurrent ( function ( w )
  {
    //When it is available, maximise it
    browser.windows.update ( w.id, { 'state' : 'maximized' }, function ( w )
    {
      //And finally, set it to fullscreen
      browser.windows.update ( w.id, { 'state' : 'fullscreen' });
      //console.log("biKiosk window ("+ w.id +") before type is ("+ browser.windows.WindowType +")");
      browser.windows.WindowType = "panel";
      //console.log("biKiosk: window ("+ w.id +") after  type is ("+ browser.windows.WindowType +")");
    });
  });
}

//Switch to fullscreen whenever the profile starts
browser.runtime.onStartup.addListener ( ffSetFullscreen );


function w_err( err )
{
  console.error(`biKiosk: Error: ${err}`);
}

function w_up2( _w )
{
  console.log("biKiosk window ("+ _w.id +") was swithed to full-screen mode");
}

function w_upd( _w )
{
  var w = browser.windows.update ( _w.id, { 'state' : 'fullscreen' } );
  w.then( w_up2, w_err );
}


async function handle_bikiosk( message ) {
  if ( message.command === "full-screen")
  {
    //console.log("biKiosk : received event : full-screen");
    var w =  browser.windows.getCurrent();
    w.then( w_upd, w_err );
  } else if ( message.command == "ff-reload") {
    //console.log("biKiosk : received event : ff-reload");
    browser.tabs.reload({ bypassCache: true });
  } else {
    //console.log(`biKiosk : received unknown event : ${message}`);
  }
}


browser.runtime.onMessage.addListener( handle_bikiosk );


/*==--- Menu ---==*/

/**
 * Performs feature detection, to detect whether access keys are supported.
 *
 * @returns {boolean}
 *          Whether access keys are supported in extension menu item labels.
 */
function detectAccessKeyMenuFeature() {
  // Access keys are supported since Firefox 63:
  // https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/63#Menus
  //
  // Before Firefox 63, any '&' in the menu label would appear literally. There
  // is no direct way to detect whether access keys are supported, so we will
  // indirectly detect support, via another feature that shipped in the same
  // release: the 'visible' property in the menus API, as shown below.

  // API parameters in the WebExtensions API are often validated immediately.
  // If validation fails, an error is thrown.
  // We can take advantage of this behavior to detect feature support:
  // If a property is not supported, an error is thrown.
  try {
    // If the feature is supported, then the API will be invoked. Pass an unused
    // menu item ID to make sure that we do not modify existing menu items.
    browser.menus.update("Some ID that is not used by any existing menu item", {
      visible: true,
    });
    return true;
  } catch (e) {
    return false;
  }
  // Side note: In Firefox 63, the menus.getTargetElement API was introduced.
  // So the above try-catch could also have been replaced with this:
  //
  // return !!browser.menus.getTargetElement;
  // 
  // The example uses try-catch anyway to demonstrate feature detection based
  // on parameter properties.
}

var IS_ACCESS_KEY_SUPPORTED = detectAccessKeyMenuFeature();

function formatMenuLabel( menuLabel ) {
  if ( !IS_ACCESS_KEY_SUPPORTED ) {
    // Access keys not supported (e.g. Firefox 62 and older).
    // Remove ampersands to prevent them from showing up literally.
    menuLabel = menuLabel.replace(/&(&?)/g, "$1");
  }
  return menuLabel;
}

// The "menuItemWithAccessKey" message is defined in  _locales/en/messages.json
// and contains a '&' to specify an access key.
// To support Firefox 62 an earlier (where access keys were not recognized),
// the example below uses formatMenuLabel to post-process the message if
// access keys are not supported.
//
// If you are not interested in supporting Firefox 62 and earlier, remove all
// of the above code, and remove "formatMenuLabel(" and ")" below.

browser.menus.create({
  id: "menu_item_ff_reload",
  title: formatMenuLabel( browser.i18n.getMessage("menuItemReload")),
  contexts: ["page"]
});

browser.menus.create({
  id: "menu_item_full_screen",
  title: formatMenuLabel( browser.i18n.getMessage("menuItemFullScreen")),
  contexts: ["page"]
});

browser.menus.onClicked.addListener(( info, tab ) => {
  if ( info.menuItemId === "menu_item_ff_reload") {
    //console.log(`Clicked menu Reload at ${info.pageUrl} in tab at index ${tab.index}`);
    browser.tabs.reload({ bypassCache: true });
  } else if ( info.menuItemId === "menu_item_full_screen") {
    //console.log(`Clicked menu Full Screen at ${info.pageUrl} in tab at index ${tab.index}`);
    var w =  browser.windows.getCurrent();
    w.then( w_upd, w_err );
  }
});

//console.log("biKiosk : background_script.js was loaded.");

