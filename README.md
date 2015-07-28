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

## Structure

### Router

Pretty much everything apart from components is laid out based on the router structure, which is as follows:

```javascript
Router.map(function() {
  this.resource('dashboard', { path: '/' });
  this.resource('performance');
  this.resource('projects');

  this.resource('team', function() {
    this.resource('team.project', { path: ':project_id' });
  });

  this.route('application_error', { path: '*path' });
});
```

### Views

Based on the routes above, the corresponding view structure is this one:

- dahsboard
- performance
- projects
- team
- team.project
- application
- application-error

As a general rule, views/templates that are used exclusively inside one resource should be put inside the folder for that resource.
Views used in the application route or views that are reused in different routes should go in the views root folder.

### Styles
Styles should follow exactly the same folder structure as their corresponding views/components. This is not required by any naming convention, but helps greatly to quickly find the styles for a certain section of the application. It follows that each view and component should have an unique class name (plus optional tag name) assigned to it.
HTML elements global styling (a.k.a reset) should be put inside the `styles/_default.scss` file.

## Coding style and best practices

### Templates
A `render` statement should always refer to a view, never directly to a template.
Templates should not contain the root element with the main view class. Add the main class to the `classNameBindings` property in the view file.
For components, the main class should be the same as the component name, minus the `as-` prefix. For views, it should be the same as the view name.

---

Whenever you need a wrapper for a certain element, unless absolutely necessary, avoid creating a class name like `element-wrapper`. Instead, add the element class to the wrapper element, and have an anonymous element inside.

**Do this:**

```html
<div class="message">
  <div>
  </div>
</div>
```

**Don't do this:**

```html
<div class="message-wrapper">
  <div class="message">
  </div>
</div>
```

---

Use the least amount of wrapper elements possible.

**Do this:**

```
{{#as-scrollable tagName="nav"}}
  <header>
  </header>
{{/as-scrollable}}
```

**Don't do this:**

```
{{#as-scrollable}}
  <nav>
    <header>
    </header>
  </nav>
{{/as-scrollable}}
```

---

Use "Clojure" style formatting for helper invocations in case the parameter list is very long.

**Do this:**

```
{{as-quick-jump-result-content
     title=name
     details=accountName
     resourceId=id
     resourcePath="client/contacts"}}
```

**Don't do this:**

```
{{
  as-quick-jump-result-content
  title=name
  details=accountName
  resourceId=id
  resourcePath="client/contacts"
}}
```

---

Use `.` as a separator for the Ember resolver. Use `/` only for templates.

**Do this:**

```
{{render "team.projects"}}

export default Ember.View.extend({
  templateName: 'team/projects'
});
```

**Don't do this:**

```
{{render "team/projects"}}

export default Ember.View.extend({
  templateName: 'team.projects'
});
```

### Styles

Prefix global variable names with the file/directory name, i. e. if you're adding a variable to `views/team/_project.scss`, make sure to prefix it with `team-project`.

**Do this:**

`$team-project-header-height: rem-calc(40);`

**Don't do this:**

`$header-height: rem-calc(40);`

---

If you have to handle optional/togglable classes for a certain selector, put the styles for those at the end.

**Do this:**

```scss
.project-list-item {
  padding: 5px;

  > div {
    color: white;
  }

  &.no-target {
    background-color: red;
  }
}
```

**Don't do this:**

```scss
.project-list-item {
  padding: 5px;

  &.no-target {
    background-color: red;
  }

  > div {
    color: white;
  }
}
```

### JavaScript

Use `Ember.computed.oneWay` instead of `Ember.computed.alias` unless there is a specific reason for propagating changes back to the source.

---

Don't use `Ember.computed` for array/collection functions (like `sort`, `filter`, etc.). It appears to be bugged in the current state.

**Do this:**

```javascript
remainingChores: Ember.computed('chores.@each.done', function() {
  return this.get('chores').filterBy('done', false);
})
```

**Don't do this:**

```javascript
remainingChores: Ember.computed.filterBy('chores', 'done', false)
```

---

Try to use `return` as little as possible.

**Do this:**

```javascript
keyUp: function(event) {
  if (event.which === 27) {
    this.set('isActive', false);
  }
}
```

**Don't do this:**

```javascript
keyUp: function(event) {
  if (event.which === 27) {
    return;
  }

  this.set('isActive', false);
}
```

---

When you have to bind an event to the document in `didInsertElement`, namespace the event with the view element ID.

**Do this:**

```javascript
clickEventName: Ember.computed('elementId', function() {
  return `click.${this.get('elementId')}`;
}),

didInsertElement: function() {
  Ember.$(document).on(this.get('clickEventName'), (event) => {
    alert('Clicked');
  });
},

willDestroyElement: function() {
  Ember.$(document).off(this.get('clickEventName'));
}
```

**Don't do this:**

```javascript
didInsertElement: function() {
  Ember.$(document).on('click', (event) => {
    alert('Clicked');
  });
}
```

---

Prefer using the `on` syntax for events like `didInsertElement` instead of overriding the method directly. This spares you from having to call `super` and gives you a chance to give a meaningful name to the method.

**Do this:**

```javascript
setupFoundation: function() {
  Ember.$(document).foundation({ dropdown: {} });
}.on('didInsertElement'),
```

**Don't do this:**

```javascript
didInsertElement: function() {
  this._super.apply(this, arguments);
  Ember.$(document).foundation({ dropdown: {} });
}
```

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
