## Sri's Universal Realtime System (URSYS)

URSYS originated in learning science research into embodied learning from 2013 to date. The requirements were LAN-based operation, realtime graphics, simulation, video, and motion tracking served from a single laptop to multiple tablet and Chromebook-type devices in a guided classroom environment. This repository is a modular rebuild of many of the key features of the original libraries into "building blocks" that hide the difficult parts of asynchronous lifecycle-driven programming in a distributed network environment. 

If you'd like to help test, see [First Install](https://github.com/dsriseah/ursys/wiki/First-Install) instructions and let me know how it went!

### Features

* Visual Studio Code `.code-workspace` script to detect node version and architecture mismatches in integrated terminal
* A core library `@ursys/core` has the system-level features in `_ur` directory
* Core Extensions are stored in `_ur_addons` directory, and can be copy/pasted as self-contained modules
* Monorepo-like structure using npm workspaces for developing more core and addon modules.
* Your app source lives in top level; folders matching `app`, `app-*`, and `*-app` are git-ignored so you can manage them as separate repos.
* Command line `ur` auto-discovers and spawns addons processes, using an entry point convention

### Queued Features

* UDS message and state server with WSS and HTTP bridges (essential!)


