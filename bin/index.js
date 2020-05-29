#!/usr/bin/env node
const readline = require('readline');
const execa = require('execa');
const path = require('path');
var fs = require('fs');
var yargs = require('yargs')
var unzipper = require('unzipper')
var os = require('os');


const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const cdir = process.cwd();

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
      break;
    case 'react':
      nodeChecker('react')
      break;
    case 'vue-django':
      pyChecker()
      nodeChecker('vue')
      break;
    case 'react-django':
      pyChecker()
      nodeChecker('react')
      break;
    case 'django':
      pyChecker()
      break;
  }
}

function execaWorker(x){
  //execa(x).then(result => console.log(result.stdout));
  execa(x);
}


function pyPlacer(){
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
  pt = selectOs()+'vue.zip';
  fs.createReadStream(pt)
  .pipe(unzipper.Extract({ path: 'frontend' }))
  .on('entry', entry => entry.autodrain())
  .promise()
  .then( () => e => console.log('error',e));


}

function reactPlacer(){
  pt = selectOs()+'react.zip';
  fs.createReadStream(pt)
  .pipe(unzipper.Extract({ path: 'frontend' }))
  .on('entry', entry => entry.autodrain())
  .promise()
  .then( () => e => console.log('error',e));
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
  var username = os.userInfo().username
  switch (platform) {
    case 'win32':
      return path.win32.normalize('C:\\Users\\'+ username +'\\AppData\\Roaming\\npm\\node_modules\\berrycli\\bin\\')
    case 'linux':
      return '/usr/local/lib/node_modules/berrycli/bin/'
  }
}


