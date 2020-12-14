# biKiosk

[https://github.com/ViterDar/biKiosk](https://github.com/ViterDar/biKiosk)

Kiosk mode for Firefox

## Features ##

1. Full screen mode
2. Reload the page by updating the external file.
3. Bidirectional message channel between JavaScript UI app and native Python app

## Full screen ##

### How it works? ###

Firefox will start in full-screen mode.
Press F11 in order to exit full-screen mode.
Context menu: biKiosk -> Full Screnn - will return kiosk into full screen mode again.

### Notes ###

May be add-on is not enough for full full-screen.
It may be nessesary some additional steps:
1. Install the Gnome Shell Integration Add-on (by Yuri Konotopov) and add "disable all gestures" extension to the Gnome
2. Add some additional css rules from [https://github.com/MrOtherGuy/firefox-csshacks](https://github.com/MrOtherGuy/firefox-csshacks) to the chrome file
   - hide tabs
   - autohide main toolbar
   -  etc...
3. Go to about:config page ane set:
   - browser.sessionstore.resume_from_crash = false
   - security.insecure_field_warning.contextual.enabled=false
   - security.fileuri.strict_origin_policy = false

## Messaging ##

### Installation ###

Copy files `bikiosk.json` and `bikiosk.py` into the `~/.mozilla/native-messaging-hosts` directory. Create it if does not exist.

Eddit `bikiosk.json`, fix `path` , it must contain full path to the file: `bikiosk.py`.

Edit `bikiosk.py`. Variable `path` must points to the file which will be whatced by Add-on.

### How it works? ###

Add-on runs `tail` command. It gets the last line when the file was updated and pass this line to the JS application. Currently only one comand realised: Reload. It reloads active Firefox Page.
Due to tail command limitations you must add "command" to the end of file and terminate it by carriage return.
