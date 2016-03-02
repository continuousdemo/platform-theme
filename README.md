# Platform Theme

## Style Guide

The online documentation is availble here: https://ec-europa.github.io/ne-theme-framework-dev/

## Requirements

* Node.js >= v5
* npm >= v3.3.6
* Python 2.7

## Install build system

Before we can build the NextEuropa Drupal 7 theme, we need to install the build system
itself. This can be done using Node.js and npm:

```bash
npm install
npm run bower update
```

This will install Bower and Gulp locally as this is the only so far to make it build correctly on ContinuousPHP.

Note: if you have Phing installed globally, you can also use the command:

```bash
phing
```

## Lint the files

```bash
# Run ESLint
npm run eslint
# Run Stylelint
npm run stylelint
# Run both linters
npm run lint
```

## Build the theme

```bash
npm run build
```

Phing alias:

```bash
phing build
```
