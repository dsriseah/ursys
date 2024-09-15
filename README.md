> See [First Install](https://github.com/dsriseah/ursys/wiki/Installation) for installation instructions. Tested on MacOS and Linux/Ubuntu.

## Sri's Universal Realtime System (URSYS)

URSYS originated in learning science research into embodied learning from 2013 to date. The requirements were LAN-based operation, realtime graphics, simulation, video, and motion tracking served from a single laptop to multiple tablet and Chromebook-type devices in a guided classroom environment. 

This repository is a modular rebuild of support features I've developed for these project. The development goal is to create many "building blocks" that hide the difficult parts of asynchronous lifecycle-driven programming in a distributed network environment under an open license compatible with contract work for the NSF grants I am working on. The usability goal is to make a NodeJS-based framework that can be used productively by intermediate-level developers who are just getting into asynchronous realtime graphics simulation programming. I'd like this to be as "plug and go" as possible. For a more detailed list of this project's goals, see [Development Priorities](https://github.com/dsriseah/ursys/wiki/Development-Priorities) in the Wiki.

Features

* Designed to use Visual Studio Code features from integrated terminal.
* Works on MacOS/Linux systems with a minimum of 4GB memory free.
* Monorepo structure implemented with npm workspaces.
* Modular separation between core, addon, and app directories for easy extensibility.
* Designed for simple copy/paste folder operation with automatic configuration whereever possible.
* Command line `ur` auto-discovers and spawns addons processes.
* Tested with nginx proxy forwarding for both http and websocket connections.
* Verbose prompting and guardrails to help users understand what's going on.
* Favors straightforward fluent code patterns and formatting so source code is easy to scan.

Under Development

* see [Closed Pull Requests](https://github.com/dsriseah/ursys/pulls?q=is:pr+is:closed) for an idea of what's new. 
* pending: import URSYS as a dependency into existing projects
* pending: other [feature porting](https://github.com/dsriseah/ursys/wiki/Catalog-of-URSYS-Modules) candidates

Documentation

* The [Wiki](https://github.com/dsriseah/ursys/wiki) and [Discussion](https://github.com/dsriseah/ursys/discussions) pages collects ongoing design thoughts. This codebase is very much a work in process. 
* Questions? Contact me via [Mastodon](https://opalstack.social/@dsri). 

