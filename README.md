# Phoenix

This README outlines the details of collaborating on this Ember application.

A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM) and [Bower](http://bower.io/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## API

To be able to talk to the API you need to install nginx as we don't currently use CORS.

* `brew install nginx`
* `ln -sfv /usr/local/opt/nginx/*.plist ~/Library/LaunchAgents`
* Copy `nginx.conf.example` to `/usr/local/etc/nginx/nginx.conf`
* Replace `YOUR_PROJECT_FOLDER_PATH` with the absolute path to the folder containing this repo
* `launchctl load ~/Library/LaunchAgents/homebrew.mxcl.nginx.plist`

## Running / Development

* `ember build --watch`
* Visit your app at http://localhost:4200.

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* ember: http://emberjs.com/
* ember-cli: http://www.ember-cli.com/
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
