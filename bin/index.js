var yargs = require('yargs')
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
  console.log('created ' + x)
}