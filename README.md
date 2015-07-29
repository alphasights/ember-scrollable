# Phoenix

[![Code Climate](https://codeclimate.com/repos/552fc2cfe30ba03cc5000d2c/badges/c927a3e95c8d88e0c940/gpa.svg)](https://codeclimate.com/repos/552fc2cfe30ba03cc5000d2c/feed)

Phoenix is the next CST delivery system.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/)
* [Bower](http://bower.io/)
* [ember-cli](http://www.ember-cli.com/)

## Installation

* `git clone git@github.com:alphasights/phoenix`
* change into the new directory
* `bin/setup`

## Running / Development

* Start Pistachio with `rails s`
* Start Phoenix with `ember server`
* Visit your app at http://localhost:4200.

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Contributing

* Install and init git flow with default values
* Start a new feature branch
* Open a PR with `develop` as the base branch
* PRs merged in `develop` get shipped to production every release cycle reset

### Deploying

The CI automatically deploys the `develop` branch to staging and the `master` branch to production.

## Switching to fallback

In order to switch to fallback go on Cloudflare and swap the DNS records for `phoenix.alphasights.com` and `phoenix-fallback.alphasights.com`

## Side panel

If you want any route's view to appear in a side panel, these are the steps you need to take.

First, just add the route like you would normally do to the router:

```javascript
Router.map(function() {
  this.resource('projects');
}
```

Create the route by mixing in the `side-panel` route mixin.

```javascript
import SidePanelRouteMixin from 'ember-cli-paint/mixins/side-panel-route';

export default SidePanelRoute.extend(SidePanelRouteMixin);
```

Wrap the route template with the `as-side-panel` component

```hbs
{{#as-side-panel class="interaction" close="hideSidePanel" previous="previous" next="next" actionReceiver=sidePanel}}
  {{#as-side-panel/main}}
    {{as-side-panel/header}}

    {{#as-side-panel/content}}
       <!-- content -->
    {{/as-side-panel/content}}
    
    {{#as-side-panel/footer}}
      <!-- content -->
    {{/as-side-panel/footer}}
  {{/as-side-panel/main}}
  
  {{#as-side-panel/drawer}}
    {{#as-side-panel/content}}
      <!-- content -->
    {{/as-side-panel/content}}
    
    {{#as-side-panel/footer}}
      <!-- content -->
    {{/as-side-panel/footer}}
  {{/as-side-panel/drawer}}
{{/as-side-panel}}
```

## Further Reading / Useful Links

* ember: http://emberjs.com/
* ember-cli: http://www.ember-cli.com/
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
