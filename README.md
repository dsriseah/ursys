URSYS originated in learning science research into embodied learning from 2013 to date. The requirements were LAN-based operation, realtime graphics, simulation, video, and motion tracking served from a single laptop to multiple tablet and Chromebook-type devices in a guided classroom environment. This repository is a modular rebuild of many of the key features of the original libraries into "building blocks" that hide the difficult parts of asynchronous lifecycle-driven programming in a distributed network environment. 

This generation of URSYS is an active work-in-progress and does not have many of the features from other projects yet. I am focusing on building the modular framework for easily adding, developing, and testing each feature with zero configuration as a goal. As a standard development environment,

* Created Visual Studio Code configuration for linting, typescript support.
* Added node version, machine architecture detection and warning.
* Created monorepo structure that has the URSYS Core Library and URSYS Addons that build on top of it. These are implemented as "npm workspaces" and `esbuild` is used to generate the library packages. 
* Defined the process of building the libraries from a root application through npm scripts. 
* Created initial addons for `loki`, `midi`
* Currently working on foundational `net` state and pub/sub services

