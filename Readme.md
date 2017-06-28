# Simple React Boilerplate
This should act as a quick kick-off point for learning how react apps are constructed. Tutorials tend to focus a lot on how components are built, and not enough on how you build a system with them. This boilerplate is constructed from what I have learned and understood to be a strong starting point. I recommend using the JetBrains IDE WebStorm to run this, although you can use any IDE or editor such as Atom or Sublime Text.

**You must install NodeJS on your machine before running this, and add the npm command to your path**

## Features
It would be good to know at the very least what each of these *does* for a system, so you can understand why they are used in the places they are. Features include:
* React.JS
* React-router
* Redux
* Webpack

## Getting started
* Install all of the dependencies:
```unix
npm install
```
* Run the webpack-dev-server (local dev environment):
```unix
npm start
```

## Deployment
To retrieve the compiled code to deploy to a web server, run:
```unix
npm build
```
This will output the compiled code into the build directory. It can then be handled by another tool or copied into the web server directory.