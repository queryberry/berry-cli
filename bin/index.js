#!/usr/bin/env node
const readline = require('readline');
const execa = require('execa');
const { exec } = require("child_process");
var fs = require('fs');
var sleep = require('sleep');
var yargs = require('yargs')

const vuePack = {
  "name": "Frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
  "dependencies": {
    "core-js": "^3.6.5",
    "vue": "^2.6.11"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "~4.4.0",
    "@vue/cli-plugin-eslint": "~4.4.0",
    "@vue/cli-service": "~4.4.0",
    "babel-eslint": "^10.1.0",
    "eslint": "^6.7.2",
    "eslint-plugin-vue": "^6.2.2",
    "vue-template-compiler": "^2.6.11"
  },
  "eslintConfig": {
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      "plugin:vue/essential",
      "eslint:recommended"
    ],
    "parserOptions": {
      "parser": "babel-eslint"
    },
    "rules": {}
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not dead"
  ]
}

const vueBalable = {
    presets: [
      '@vue/cli-plugin-babel/preset'
    ]
  }

const vuePublic = [
  "<!DOCTYPE html>"  + '\r\n' +
  '<html lang="en">'+ '\r\n' +
    "<head>"+ '\r\n' +
      '<meta charset="utf-8">'+ '\r\n' +
      '<meta http-equiv="X-UA-Compatible" content="IE=edge">'+ '\r\n' +
      '<meta name="viewport" content="width=device-width,initial-scale=1.0">'+ '\r\n' +
      '<link rel="icon" href="<%= BASE_URL %>favicon.ico">'+ '\r\n' +
      '<title><%= htmlWebpackPlugin.options.title %></title>'+ '\r\n' +
    '</head>'+ '\r\n' +
    '<body>'+ '\r\n' +
      '<noscript>'+ '\r\n' +
        "<strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>"+ '\r\n' +
      '</noscript>'+ '\r\n' +
      '<div id="app"></div>'+ '\r\n' +
      '<!-- built files will be auto injected -->'+ '\r\n' +
    '</body>'+ '\r\n' +
  '</html>'

]

const vueMainJs = [
  "import Vue from 'vue'"+ '\r\n' + 

  "Vue.config.productionTip = false" + '\r\n' + 

  "new Vue({" + '\r\n' +
    "render: h => h(App)," + '\r\n' +
  "}).$mount('#app')"

]


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var argv = yargs
  .usage('usage: $0 <command>')
  .command('vue', 'create a new vue js project', function (yargs) {
    createProject('vue')
  })
  .command('react', 'create a new react project', function (yargs) {
    createProject('react')
  })
  .command('vue-django', 'create a new vue + django project', function (yargs) {
    createProject('vue-django')
  })
  .command('react-django', 'create a new react + django project', function (yargs) {
    createProject('react-django')
  })
  .command('django', 'create a new django project', function (yargs) {
    createProject('django')
  })
  .help('help')
  .wrap(null)
  .argv

checkCommands(yargs, argv, 1)

function checkCommands (yargs, argv, numRequired) {
  if (argv._.length < numRequired) {
    yargs.showHelp()
  } else {
    
  }
}

function createProject(x){
  console.log('creating ' + x)
  switch (x) {
    case 'vue':
      nodeChecker('vue')
      //pyChecker()
      break;
    case 'react':
      alert( 'Маловато' );
      break;
    case 'vue-django':
      alert( 'Маловато' );
      break;
    case 'react-djang':
      alert( 'Маловато' );
      break;
    case 'django':
      alert( 'Маловато' );
      break;
  }
}

function execaWorker(x){
  //execa(x).then(result => console.log(result.stdout));
  execa(x);
}


function msleep(n) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}
function sleeper(n) {
  msleep(n*1000);
}

function pyPlacer(){
  var cdir = process.cwd();
  
  rl.question('select django project name: ', (answer) => {
    execaWorker('mkdir backend');
    execaWorker('cd backend');
    execaWorker('django-admin startproject ' + answer + ' backend');
    rl.close();
  });

}

function djangoInstaller(){
  try {
    execaWorker('python -m pip install Django')
    execaWorker('python -m pip install djangorestframework')
    execaWorker('python -m pip install djangorestframework-jwt')
    execaWorker('python -m pip install djangorestframework-simplejwt')
    pyPlacer()
  
  } catch(err){
    console.log(err)
  }
  
}

function pyChecker(){
  try {
    execaWorker('python --version')
    execaWorker('pip3 --version')
    djangoInstaller()
  
  } catch(err) {
    console.log(err + ' pls check your python or pip version it must be 3.xx ')
  }

}

function vuePlacer(){
  rl.question('select vue project name: ', (answer) => {
    execaWorker('mkdir frontend');
    let fdir = 'frontend/' + answer
    execaWorker('mkdir ' + fdir);
    execaWorker('mkdir ' + fdir + '/public')
    execaWorker('mkdir ' + fdir + '/src')
    execaWorker('mkdir ' + fdir + '/src/assets')
    execaWorker('mkdir ' + fdir + '/src/components')

    sleeper(5); 
    
    fs.appendFile(fdir + '/package.json', JSON.stringify(vuePack, null, 4), function (err) {
      if (err) throw err;
    });

    fs.appendFile(fdir + '/babel.config.js', JSON.stringify(vueBalable, null, 4).replace(/"([^"]+)":/g, '$1:') , function (err) {
      if (err) throw err;
    });

    fs.appendFileSync(fdir + '/babel.config.js', 'module.exports =' , function (err) {
      if (err) throw err;
    });

    fs.appendFile(fdir + '/public/index.html', vuePublic[0], function (err) {
      if (err) throw err;
    });

    fs.appendFile(fdir + '/src/main.js', vueMainJs[0], function (err) {
      if (err) throw err;
    });

    //execaWorker('django-admin startproject ' + answer + ' backend');
    rl.close();
  });
}

function reactPlacer(){
  execa('npx create-react-app my-app')
}

function nodeChecker(x){
  try{
    execaWorker('node --version')
    execaWorker('npm --version')

    switch (x) {
      case 'vue':
        vuePlacer()
        break;
      case 'react':
        reactPlacer()
        break;
    }

  
  } catch(err){
    console.log(err)
  }
  
}

function selectOs(){
  var platform = process.platform;
  switch (platform) {
    case 'win32':
      return 'win32'
    case 'linux':
      return 'linux'
  }
}


