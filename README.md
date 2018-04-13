# Cordova Google Maps Plugin Demo application for the Ionic framework

## Purpose
This test project to test features, occasionally report bugs of the official Cordova Google Maps plugin to be found here:
https://github.com/mapsplugin/cordova-plugin-googlemaps

## Installation
Follow the steps to make this project work in your development environment:
1. Clone this repository using **git clone**
2. Edit **package.json** and **config.xml** files and supply your Google Maps API keys.
3. Run **npm install** to install all library dependencies.
4. Run the **ionic cordova prepare** command to set up both IOS and Android environments and download all used Cordova plugins including Google Maps.
5. Start the project by running the **ionic cordova run ios** or **ionic cordova run android** command.
## Notes
- **Do not use the ionic serve** command as Google Maps requires to be run on a real device or emulator.
-  Should you get a white screen it means your API keys are incorrectly specified.
- I will try to keep this project up-to-date with at least the major Ionic Native and/or Cordova Google Maps plugin releases. If you run into issues, submit a question.
