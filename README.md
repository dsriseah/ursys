## Sri's Universal Realtime System (URSYS)

URSYS originated in learning science research into embodied learning from 2013 to date. The requirements were LAN-based operation, realtime graphics, simulation, video, and motion tracking served from a single laptop to multiple tablet and Chromebook-type devices in a guided classroom environment. This repository is a modular rebuild of many of the key features of the original libraries into "building blocks" that hide the difficult parts of asynchronous lifecycle-driven programming in a distributed network environment. 

Major goal is to make a NodeJS-based framework that approachable to intermediate-level developers who are just getting into asyncronous realtime simulation programming. We want this to be as "plug and go" with as low a threshold to starting.

Current Features

* Visual Studio Code `.code-workspace` script to detect node version and architecture mismatches in integrated terminal.
* Local development model for Macos and Linux-based systems with 4GB minimum memory.
* A core library `@ursys/core` has the system-level features in `_ur` directory
* Core Extensions are stored in `_ur_addons` directory, and can be copy/pasted as self-contained modules.
* Monorepo-like structure using npm workspaces for developing more core and addon modules.
* Command line `ur` auto-discovers and spawns addons processes, using an entry point convention.
* Pub/Sub message broker interface for webclient-to-webclient mesaging, including transactions that asynchronously return values.
* Your app source lives in top level; folders matching `app`, `app-*`, and `*-app` are git-ignored so you can manage your repositories separately from the URSYS Framework that hosts them.

Features Under Development

* import URSYS as a dependency into existing projects
* secure remote server

Check out the [Wiki](https://github.com/dsriseah/ursys/wiki) for detailed information about URSYS concepts. If you'd like to help test, see [First Install](https://github.com/dsriseah/ursys/wiki/Installation) instructions.

Questions? Contact me via [Mastadon](https://opalstack.social/@dsri). 

