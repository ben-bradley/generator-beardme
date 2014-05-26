#Beard Me ![beard](https://raw.githubusercontent.com/ben-bradley/generator-beardme/master/app/templates/public/img/beard.png)
Based on Randy Lebeau's Stacked, but customized to suit my tastes.

##Install
- [NodeJS](http://nodejs.org/)
- [MongoDB](http://www.mongodb.org/downloads)
- Install Yeoman & Beard Me
```javascript
npm install -g yeoman generator-beardme grunt
yo beardme
grunt init
vi server/config/config.js
grunt test
grunt server
```

##TODO
- Write more tests
- Clean up the `public/` side
- Re-work the non-dev aspects
- Add Socket.IO (?)
- Add sub-generator for MVC
- ideas?

##0.1.6
- Added Socket.IO! You can select it at the `yo beardme` prompt.  Look in `public/js/app/views/MainView.js` for an example of how to use it.
- Prevented `Router.js` from loading `MainView.js` twice

##0.1.5
- **!!!UPDATED DEPENDENCIES!!!** - All dependencies are now current & tests work.  If your generated apps behave strangely, please let me know & I'll look in to it.
- Added browser auto-launch on server start
- Moved Yeoman prompt input vars into an `inputs` namespace
- Wrote server tests
- Added `jsonp.js` to the `server/api/`, look at `public/js/app/templates/Main.html` for how to use it =)
- Added a beard counter using `jsonp.js`

##0.1.4
- Added Winston for logging

##0.1.3
- Rewrote the MongoDB Schema handler to use `Schema.statics` instead of `prototype`ing
- Added prompts to populate config.js for MongoDB

##0.1.2
- Added support for SSL via the [PEM](http://npmjs.org/package/pem) module
- Added some beardy bling
