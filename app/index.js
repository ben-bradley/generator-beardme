'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var BeardMeGenerator = module.exports = function BeardMeGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function() {
    var self = this;
    this.installDependencies({
      bower       : true,
      npm         : true,
      skipInstall : false,
      callback: function() {
        self.log.write('\n\n\nYou\'re almost there! You just have to init the build...\n\n');
        self.log.write('  $ grunt init\n\n');
        self.log.write('Then verify your server/config/config.js details:\n\n');
        self.log.write('  $ vi server/config/config.js\n\n');
        self.log.write('You might also want to test it to make sure it\'s working:\n\n');
        self.log.write('  $ grunt test\n\n');
        self.log.write('Then start it up!\n\n');
        self.log.write('  $ grunt server\n\n');
      }
    });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(BeardMeGenerator, yeoman.generators.Base);

BeardMeGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name    : 'userName',
    type    : 'input',
    message : 'What is your name?',
    default : 'John Doh'
  }, {
    name    : 'github',
    type    : 'input',
    message : 'What is your github username?',
    default : 'jdoh'
  }, {
    name    : 'projectName',
    type    : 'input',
    message : 'What do you want to name your app?',
    default : 'BeardyApp'
  }, {
    name    : 'httpPort',
    type    : 'input',
    message : 'What port shoud the app listen on?',
    default : '8000'
  }, {
    name    : 'ssl',
    type    : 'confirm',
    message : 'Would you like to use self-signed SSL?'
  }, {
    name    : 'devDb',
    type    : 'input',
    message : 'DEV MongoDB (user:pass@host:port/db)',
    default : 'localhost:27017/beardme'
  }, {
    name    : 'testDb',
    type    : 'input',
    message : 'TEST MongoDB',
    default : 'user:pass@test-mongodb:27018/beardme'
  }, {
    name    : 'prodDb',
    type    : 'input',
    message : 'PROD MongoDB',
    default : 'user:pass@mongodb:27017/beardme'
  }];

  this.prompt(prompts, function(props) {
    this.inputs = {};
    for (var p in props)
      this.inputs[p] = props[p];
    cb();
  }.bind(this));
};

BeardMeGenerator.prototype.buildDirs = function buildDirs() {
  [
    'server',
    'server/config',
    'server/api',
    'server/schemas',
    'server/logs',
    'server/test',
    'server/io',
    'public',
    'public/fonts',
    'public/css',
    'public/css/includes',
    'public/css/includes/css',
    'public/css/includes/less',
    'public/img',
    'public/js',
    'public/js/libs',
    'public/js/libs/plugins',
    'public/js/app',
    'public/js/app/collections',
    'public/js/app/config',
    'public/js/app/models',
    'public/js/app/routers',
    'public/js/app/templates',
    'public/js/app/views',
    'public/js/app/events'
  ].forEach(this.mkdir);
};

BeardMeGenerator.prototype.buildFiles = function buildFiles() {
  var self = this;
  [
    // root files
    [ '_package.json',  'package.json' ],
    [ '_bower.json',    'bower.json'   ],
    [ '_Gruntfile.js',  'Gruntfile.js' ],
    [ '_LICENSE-MIT',   'LICENSE-MIT'  ],
    [ '_README.md',     'README.md'    ],
    [ '_.bowerrc',      '.bowerrc'     ],
    [ '_.gitignore',    '.gitignore'   ],
    [ '_.travis.yml',   '.travis.yml'  ],
//    // server files
    [ 'server/_server.js',            'server/server.js'        ],
    [ 'server/api/_user.js',          'server/api/user.js'      ],
    [ 'server/api/_ping.js',          'server/api/ping.js'      ],
    [ 'server/api/_jsonp.js',         'server/api/jsonp.js'     ],
    [ 'server/io/_time.js',           'server/io/time.js'       ],
    [ 'server/config/_config.js',     'server/config/config.js' ],
    [ 'server/schemas/_user.js',      'server/schemas/user.js'  ],
    [ 'server/test/_spec.js',         'server/test/spec.js'     ],
    // public/ files
    [ 'public/_index.html',                               'public/index.html'                               ],
    [ 'public/css/_app.css',                              'public/css/app.css'                              ],
    [ 'public/css/_jasmine.css',                          'public/css/jasmine.css'                          ],
    [ 'public/css/includes/css/_custom.css',              'public/css/includes/css/custom.css'              ],
    [ 'public/js/app/config/_Init.js',                    'public/js/app/config/Init.js'                    ],
    [ 'public/js/app/routers/_Router.js',                 'public/js/app/routers/Router.js'                 ],
    [ 'public/js/app/events/_Notifier.js',                'public/js/app/events/Notifier.js'                ],
    [ 'public/js/app/models/_UserModel.js',               'public/js/app/models/UserModel.js'               ],
    [ 'public/js/app/collections/_UsersCollection.js',    'public/js/app/collections/UsersCollection.js'    ],
    [ 'public/js/app/views/_MainView.js',                 'public/js/app/views/MainView.js'                 ],
    [ 'public/js/libs/plugins/_Backbone.validateAll.js',  'public/js/libs/plugins/Backbone.validateAll.js'  ],
    [ 'public/js/app/templates/_Main.html',               'public/js/app/templates/Main.html'               ],
    // add the templatized MVC stuff
    [ 'public/js/app/models/_TemplateModel.js',           'public/js/app/models/TemplateModel.js'           ],
    [ 'public/js/app/collections/_TemplateCollection.js', 'public/js/app/collections/TemplateCollection.js' ],
    [ 'public/js/app/views/_TemplateView.js',             'public/js/app/views/TemplateView.js'             ],
    [ 'public/js/app/templates/_Template.html',           'public/js/app/templates/Template.html'           ]
  ].forEach(function(files) { self.template(files[0], files[1]); });

  [ // files to copy w/o templating
    [ 'public/img/beard.png',           'public/img/beard.png'            ],
    [ 'public/img/ajax-loader.gif',     'public/img/ajax-loader.gif'      ],
    [ 'public/img/jasmine-favicon.png', 'public/img/jasmine-favicon.png'  ],
    [ 'public/favicon.ico',             'public/favicon.ico'              ]
  ].forEach(function(file) { self.copy(file[0], file[1]); });

  // Tests
  //this.copy('public/_TestInit.js', 'public/js/tests/config/TestInit.js');
  //this.copy('public/_spec.js', 'public/js/tests/specs/spec.js');

};



