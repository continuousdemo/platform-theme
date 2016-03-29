[![Build Status](https://status.continuousphp.com/git-hub/ec-europa/platform-theme-dev?token=2deae87d-7311-46ff-9926-cf6cf9284890)](https://continuousphp.com/git-hub/ec-europa/platform-theme-dev)

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

Note: if you have Phing installed globally, you can also use the following command which will install the development environment and build the theme:

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
