# build-innosetup

[![apm](https://img.shields.io/apm/l/build-innosetup.svg?style=flat-square)](https://atom.io/packages/build-innosetup)
[![apm](https://img.shields.io/apm/v/build-innosetup.svg?style=flat-square)](https://atom.io/packages/build-innosetup)
[![apm](https://img.shields.io/apm/dm/build-innosetup.svg?style=flat-square)](https://atom.io/packages/build-innosetup)
[![Travis](https://img.shields.io/travis/idleberg/atom-build-innosetup.svg?style=flat-square)](https://travis-ci.org/idleberg/atom-build-innosetup)
[![David](https://img.shields.io/david/idleberg/atom-build-innosetup.svg?style=flat-square)](https://david-dm.org/idleberg/atom-build-innosetup)
[![David](https://img.shields.io/david/dev/idleberg/atom-build-innosetup.svg?style=flat-square)](https://david-dm.org/idleberg/atom-build-innosetup?type=dev)

[Atom Build](https://atombuild.github.io/) provider for Inno Setup, compiles Inno Setup. Supports the [linter](https://atom.io/packages/linter) package for error highlighting.

![Screenshot](https://raw.githubusercontent.com/idleberg/atom-build-innosetup/master/screenshot.png)

*See the linter in action*

## Installation

### apm

Install `build-innosetup` from Atom's [Package Manager](http://flight-manual.atom.io/using-atom/sections/atom-packages/) or the command-line equivalent:

`$ apm install build-innosetup`

### Using Git

Change to your Atom packages directory:

```bash
# Windows
$ cd %USERPROFILE%\.atom\packages

# Linux & macOS
$ cd ~/.atom/packages/
```

Clone repository as `build-innosetup`:

```bash
$ git clone https://github.com/idleberg/atom-build-innosetup build-innosetup
```

Inside the cloned directory, install Node dependencies:

```bash
$ yarn || npm install
```

## Usage

### Build

Before you can build, make sure `ISCC.exe` is already in your PATH [environmental variable](https://support.microsoft.com/en-us/kb/310519). Next up, select an active target with your preferred build option.

Available targets:

* `Inno Setup` — compile script (<kbd>Super</kbd>+<kbd>Alt</kbd>+<kbd>B</kbd>)

### Shortcuts

Here's a reminder of the default shortcuts you can use with this package:

**Select active target**

<kbd>Super</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd> or <kbd>F7</kbd>

**Build script**

<kbd>Super</kbd>+<kbd>Alt</kbd>+<kbd>B</kbd> or <kbd>F9</kbd>

**Jump to error**

<kbd>Super</kbd>+<kbd>Alt</kbd>+<kbd>G</kbd> or <kbd>F4</kbd>

**Toggle build panel**

<kbd>Super</kbd>+<kbd>Alt</kbd>+<kbd>V</kbd> or <kbd>F8</kbd>

## License

This work is licensed under the [The MIT License](LICENSE).
