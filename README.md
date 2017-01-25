# Ember Scrollable
[![Ember Version](https://embadge.io/v1/badge.svg?start=2.3.0)](https://embadge.io/v1/badge.svg?start=2.3.0)
[![Npm Version](https://badge.fury.io/js/ember-scrollable.svg)](http://badge.fury.io/js/ember-scrollable)
[![Code
Climate](https://codeclimate.com/github/alphasights/ember-scrollable/badges/gpa.svg)](https://codeclimate.com/github/alphasights/ember-scrollable)
[![Build Status](https://travis-ci.org/alphasights/ember-scrollable.svg?branch=master)](https://travis-ci.org/alphasights/ember-scrollable)

A simple scrollbar implementation inspired by Trackpad Scroll Emulator.

[Check out the demo](https://alphasights.github.io/ember-scrollable/demo)

## Installation

* `ember install ember-scrollable`

## Basic Usage

```htmlbars
{{! app/templates/index.hbs }}

{{#ember-scrollable}}
  Some long content...
{{/ember-scrollable}}
```

## Configuring the Component

The component accepts the following options:

- `horizontal`: Enables horizontal scrolling (default: `false`)
- `vertical`: Enables vertical scrolling (default: `true` if horizontal is unset)
- `autoHide`: Enables auto hiding of the scrollbars on mouse out (default: `true`)
- `scrollTo`: Set this property to manually scroll to a certain position (if in single bar mode)
- `scrollToX`: Set this property to manually scroll to a certain position in the horizontal direction
- `scrollToY`: Set this property to manually scroll to a certain position in the vertical direction
- `onScroll(scrollOffset, event)`: action triggered whenever the user scrolls, called with the current `scrollOffset` and the original scroll `event`
- `onScrolledToBottom`: action triggered when user scrolled to the bottom

## Advanced Usage

```htmlbars
{{#ember-scrollable horizontal=true vertical=true}}
  content that is wide and long.
{{/ember-scrollable}}
```

## Developing

### Setup

* `git clone https://github.com/alphasights/ember-scrollable.git`
* `npm install && bower install`

### Running

* `ember server`

### Running Tests

* `ember test --server`
