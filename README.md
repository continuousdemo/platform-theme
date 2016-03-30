[![Build Status](https://status.continuousphp.com/git-hub/ec-europa/platform-theme?token=a68c0ac0-3762-48d4-a856-6b635b62acdc)](https://continuousphp.com/git-hub/ec-europa/platform-theme)

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
```

This will install Bower and Gulp locally as this is the only so far to make it build correctly on ContinuousPHP. Then, you can build the theme:

```bash
npm run build
```

Note: if you want to use Phing, you can also use the following commands which will install the development environment and build the theme:

```bash
composer install
./bin/phing build-theme-dev
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
Or with Phing:

```bash
./bin/phing lint
```
