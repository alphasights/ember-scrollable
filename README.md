# Ember Scrollable

[![Npm Version](https://badge.fury.io/js/ember-scrollable.svg)](http://badge.fury.io/js/ember-scrollable)
[![Code
Climate](https://codeclimate.com/github/alphasights/ember-scrollable/badges/gpa.svg)](https://codeclimate.com/github/alphasights/ember-scrollable)
[![Build Status](https://circleci.com/gh/alphasights/ember-scrollable.svg?style=shield&circle-token=6fa581b50c5f8496cf26768394cf6c1d43dfb98e)](https://circleci.com/gh/alphasights/ember-scrollable)

A simple wrapper around Trackpad Scroll Emulator.

[Check out the demo](https://alphasights.github.io/ember-scrollable/demo)

## Installation

* `ember install ember-scrollable`

## Basic Usage

```htmlbars
{{! app/templates/index.hbs }}

{{#as-scrollable}}
  Some long content...
{{/as-scrollable}}
```

## Configuring the Component

The component accepts the following options:

- `horizontal`: Enables horizontal scrolling (default: `false`)
- `autoHide`: Enables auto hiding of the scrollbars on mouse out (default: `true`)
- `onScrolledToBottom`: action triggered when user scrolled to the bottom

## Developing

### Setup

* `git clone https://github.com/alphasights/ember-scrollable.git`
* `npm install && bower install`

### Running

* `ember server`

### Running Tests

* `ember test --server`
