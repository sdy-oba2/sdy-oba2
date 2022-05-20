---
sidebar_position: 1
slug: /setup/linux
---

# Linux

References: [Setup environment](https://reactnative.dev/docs/environment-setup)

## Target OS:

### `IOS`

### Unsupported

:::caution
A Mac is required to build projects with native code for iOS. You can follow the **_Expo CLI Quickstart_** to learn how to build your app using Expo instead.
:::

### `Android`

## Installing dependencies:

You will need Node, the React Native command line interface, a JDK, and Android Studio.

While you can use any editor of your choice to develop your app, you will need to install Android Studio in order to set up the necessary tooling to build your React Native app for Android.

### Node

Follow the [`installation instructions for your Linux distribution`](https://nodejs.org/en/download/package-manager/) to install Node 14 or newer.

### Java Development Kit

React Native requires at least the version 8 of the Java SE Development Kit (JDK). You may download and install [`OpenJDK`](http://openjdk.java.net/) from [`AdoptOpenJDK`](https://adoptopenjdk.net/) or your system packager. You may also [`Download and install Oracle JDK 14`](https://www.oracle.com/java/technologies/downloads/) if desired.

### Android development environment

Setting up your development environment can be somewhat tedious if you're new to Android development. If you're already familiar with Android development, there are a few things you may need to configure. In either case, please make sure to carefully follow the next few steps.

#### 1. Install Android Studio

[`Download and install Android Studio`](https://developer.android.com/studio/index.html). While on Android Studio installation wizard, make sure the boxes next to all of the following items are checked:

- `Android SDK`
- `Android SDK Platform`
- `Android Virtual Device`
- If you are not already using Hyper-V: `Performance (Intel ® HAXM)` [`(See here for AMD or Hyper-V)`](https://android-developers.googleblog.com/2018/07/android-emulator-amd-processor-hyper-v.html)

Then, click "Next" to install all of these components.

:::caution
If the checkboxes are grayed out, you will have a chance to install these components later on.
:::

Once setup has finalized and you're presented with the Welcome screen, proceed to the next step.

#### 2. Install the Android SDK

Android Studio installs the latest Android SDK by default. Building a React Native app with native code, however, requires the `Android 11 (R)` SDK in particular. Additional Android SDKs can be installed through the SDK Manager in Android Studio.

To do that, open Android Studio, click on "Configure" button and select "SDK Manager".

:::caution
The SDK Manager can also be found within the Android Studio "Preferences" dialog, under `Appearance & Behavior → System Settings → Android SDK.`
:::

Select the "SDK Platforms" tab from within the SDK Manager, then check the box next to "Show Package Details" in the bottom right corner. Look for and expand the `Android 11 (R)` entry, then make sure the following items are checked:

- `Android SDK Platform 30`
- `Intel x86 Atom_64 System Image or Google APIs Intel x86 Atom System Image`

Next, select the "SDK Tools" tab and check the box next to "Show Package Details" here as well. Look for and expand the "Android SDK Build-Tools" entry, then make sure that `30.0.2` is selected.

Finally, click "Apply" to download and install the Android SDK and related build tools.

#### 3. Configure the ANDROID_SDK_ROOT environment variable

The React Native tools require some environment variables to be set up in order to build apps with native code.

Add the following lines to your `$HOME/.bash_profile` or `$HOME/.bashrc` (if you are using `zsh` then `~/.zprofile` or `~/.zshrc`) config file:

```bash
export ANDROID_SDK_ROOT=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_SDK_ROOT/emulator
export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
```

:::caution
`.bash_profile` is specific to `bash`. If you're using another shell, you will need to edit the appropriate shell-specific config file.
:::

Type `source $HOME/.bash_profile` for `bash` or `source $HOME/.zprofile` to load the config into your current shell. Verify that ANDROID_SDK_ROOT has been set by running `echo $ANDROID_SDK_ROOT` and the appropriate directories have been added to your path by running `echo $PATH`.

:::caution
Please make sure you use the correct Android SDK path. You can find the actual location of the SDK in the Android Studio "Preferences" dialog, under **_Appearance & Behavior → System Settings → Android SDK_**.
:::

### Watchman

Follow the [`Watchman installation guide`](https://facebook.github.io/watchman/docs/install.html) to compile and install Watchman from source.

:::caution
[`Watchman`](https://facebook.github.io/watchman/docs/install.html) is a tool by Facebook for watching changes in the filesystem. It is highly recommended you install it for better performance and increased compatibility in certain edge cases (translation: you may be able to get by without installing this, but your mileage may vary; installing this now may save you from a headache later).
:::

### React Native Command Line Interface

React Native has a built-in command line interface. Rather than install and manage a specific version of the CLI globally, we recommend you access the current version at runtime using `npx`, which ships with Node.js. With `npx react-native <command>`, the current stable version of the CLI will be downloaded and executed at the time the command is run.
