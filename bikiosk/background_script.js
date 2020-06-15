// Put all the javascript code here, that you want to execute in background.
function ffSetFullscreen ()
{
  //First get the actual window
  browser.windows.getCurrent (function ( w )
  {
    //When it is available, maximise it
    browser.windows.update (w.id, { 'state' : 'maximized' }, function ( w )
    {
      //And finally, set it to fullscreen
      browser.windows.update (w.id, { 'state' : 'fullscreen' });
    });
  });
}

//Switch to fullscreen whenever the profile starts
browser.runtime.onStartup.addListener ( ffSetFullscreen );
