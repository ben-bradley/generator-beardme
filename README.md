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
grunt server
```

##TODO
- Add logging (Winston)
- Add Socket.IO (?)
- Add sub-generator for MVC
- Write tests!

##0.1.3
- Rewrote the MongoDB Schema handler to use `Schema.statics` instead of `prototype`ing
- Added prompts to populate config.js for MongoDB

##0.1.2
- Added support for SSL via the [PEM](http://npmjs.org/package/pem) module
- Added some beardy bling
