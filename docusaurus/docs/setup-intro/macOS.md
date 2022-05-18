---
sidebar_position: 1
slug: /setup/macOS
---

# macOS

References: [Setup environment](https://reactnative.dev/docs/environment-setup)

## Target OS:

### `IOS`

## Installing dependencies:

You will need Node, Watchman, the React Native command line interface, Xcode and CocoaPods.

While you can use any editor of your choice to develop your app, you will need to install Xcode in order to set up the necessary tooling to build your React Native app for iOS.

### Node & Watchman

```bash
brew install node
brew install watchman
```

If you have already installed Node on your system, make sure it is Node 14 or newer.

### Xcode

The easiest way to install Xcode is via the Mac App Store. Installing [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12) will also install the iOS Simulator and all the necessary tools to build your iOS app.

If you have already installed Xcode on your system, make sure it is version 10 or newer.

### Command Line Tools

You will also need to install the Xcode Command Line Tools. Open Xcode, then choose "Preferences..." from the Xcode menu. Go to the Locations panel and install the tools by selecting the most recent version in the Command Line Tools dropdown.

![Docusaurus logo](/img/CommandLineTools.png)

### Installing an iOS Simulator in Xcode

To install a simulator, open **_Xcode > Preferences..._** and select the **_Components_** tab. Select a simulator with the corresponding version of iOS you wish to use.

### CocoaPods

[CocoaPods](https://cocoapods.org/) is built with Ruby and it will be installable with the default Ruby available on macOS. You can use a Ruby Version manager, however we recommend that you use the standard Ruby available on macOS unless you know what you're doing.

Using the default Ruby install will require you to use `sudo` when installing gems. (This is only an issue for the duration of the gem installation, though.)

```bash
sudo gem install cocoapods
```

### `Android`

## Installing dependencies:

You will need Node, Watchman, the React Native command line interface, a JDK, and Android Studio.

While you can use any editor of your choice to develop your app, you will need to install Android Studio in order to set up the necessary tooling to build your React Native app for Android.

### Node & Watchman

```bash
brew install node
brew install watchman
```

If you have already installed Node on your system, make sure it is Node 14 or newer.

### Java Development Kit

We recommend installing the OpenJDK distribution called Azul **_Zulu_** using [Homebrew](https://brew.sh/). Run the following commands in a Terminal after installing Homebrew:

```bash
brew tap homebrew/cask-versions
brew install --cask zulu11
```

The Zulu OpenJDK distribution offers JDKs for **_both Intel and M1 Macs._** This will make sure your build are faster on M1 Macs compared to using an Intel-based JDK.

If you have already installed JDK on your system, make sure it is JDK 11 or newer.

### Android development environment

Setting up your development environment can be somewhat tedious if you're new to Android development. If you're already familiar with Android development, there are a few things you may need to configure. In either case, please make sure to carefully follow the next few steps.

#### 1. Install

[Download and install Android Studio ](https://developer.android.com/studio/index.html). While on Android Studio installation wizard, make sure the boxes next to all of the following items are checked:

- `Android SDK`
- `Android SDK Platform`
- `Android Virtual Device`
- `Then, click "Next" to install all of these components.`

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

### React Native Command Line Interface

React Native has a built-in command line interface. Rather than install and manage a specific version of the CLI globally, we recommend you access the current version at runtime using `npx`, which ships with Node.js. With `npx react-native <command>`, the current stable version of the CLI will be downloaded and executed at the time the command is run.
