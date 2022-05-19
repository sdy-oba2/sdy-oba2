---
sidebar_position: 1
slug: /
---

# Setup Introduction

## Install Nodejs:

Select the operating system on which you are installing Nodejs: [ Install | Nodejs](https://nodejs.org/en/download/)

## Editor:

Visual Studio Code
Install [Visual Studio Code](https://code.visualstudio.com/), latest stable version.

## Setting up the development environment:

Selecting available environment:

- Install [macOS](/docs/setup/macOS)
- Install [Windows](/docs/setup/windows)
- Install [Linux](/docs/setup/linux)

Or following this link to setup the development environment for ios/android device [Setup environment](https://reactnative.dev/docs/environment-setup)

## Run App:

Step 1: Download/ Clone source code

Step 2: Open source in VS code

Step 3: In terminal: Run

```bash
npm install && npx pod-install
```

to install libraries and packages.

Step 4: In terminal: Run

```bash
npx react-native start
```

to start Metro (inside your React Native project folder),

Step 4: In terminal: Continue run

```bash
npm run ios
```

to build and run app in `ios device` or run

```bash
npm run android
```

to in `android device`,
