const isDocker = require('is-docker');

if(isDocker()){
    console.log('Running inside a Docker container');
}