# Pow2 [![Build Status](https://secure.travis-ci.org/justindujardin/pow2.png)](http://travis-ci.org/justindujardin/pow2)

Pow is going to be a real game one day.  For now it's an experimental Typescript/AngularJS RPG game.

> You need to have Node.JS and Grunt.JS installed, and a basic familiarity with executing commands in your system terminal.

## Getting Started

You should really only need Node.JS and Grunt.  Let's do it:

### Node.JS

[Download](http://nodejs.org/) and install it.

> node --version
>
> npm --version

If those commands both return a value, and no error message, you're ready to go.

### Grunt

Install the `grunt` utility.

> npm install -g grunt-cli
>
> grunt --version

If you receive errors, you may need to run this command as an administrator on your OS.  For more detailed information, see
the grunt [Getting Started Guide](http://gruntjs.com/getting-started#installing-the-cli).

## Installing

Install the npm dependencies:

> npm install

## Developing

Once you've installed the project, start up the developer workflow using grunt:

> grunt develop

This command start a long-running process that will build the game files, and host a web server at (http://localhost:5215/).
If a file (Sprites, Maps, Code) changes while this task is running, it will automatically build new outputs.  This means you
can edit your files and refresh your webpage a few moments later when the new build is done.  No muss, no fuss, just game stuff.

### Committing

Commit messages should [follow conventions](https://github.com/justindujardin/pow2/blob/master/CONVENTIONS.md)
