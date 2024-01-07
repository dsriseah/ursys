URSYS originated in learning science research into embodied learning from 2013 to date. The requirements were LAN-based operation, realtime graphics, simulation, video, and motion tracking served from a single laptop to multiple tablet and Chromebook-type devices in a guided classroom environment. This repository is a modular rebuild of many of the key features of the original libraries into "building blocks" that hide the difficult parts of asynchronous lifecycle-driven programming in a distributed network environment. 

This generation of URSYS is an active work-in-progress and does not have many of the features from other projects yet. I am focusing on building the modular framework for easily adding, developing, and testing each feature with zero configuration as a goal. 

#### INSTALL

Requirements (MacOS) 
* **Xcode command line tools** - open a terminal window and type `xcode-select --install` and accept license, then wait.
* **Node Version Manager** (`nvm`) - follow instructions for **[nvm-sh](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)**
* **Visual Studio Code** - download at [code.visualstudio.com/download](https://code.visualstudio.com/download)

After you've successfully installed the above, you can proceed:

* Open a terminal window `cd` to your developer directory, then `git@github.com:dsriseah/ursys.git`
* In Visual Studio Code, open the `sri-ursys.code-workspace` project file, which contains various settings
* Type `ctrl ~ (tilde)` to open the integrated terminal
* `cat .nvmrc` to see what version of NodeJS is required by ursys; for this example it will be `v18.18.2`.
* install required node version with nvm (e.g. `nvm install v18.18.2`)
* set the correct node version in-use (e.g. `nvm use v18.18.2`)

Install Node dependencies:

* `npm ci`

Run the example:

* `npm run example`
* open `http://localhost:3000` in a browser

#### PROGRESS LOG

* Created Visual Studio Code configuration for linting, typescript support.
* Added node version, machine architecture detection and warning.
* Created monorepo structure that has the URSYS Core Library and URSYS Addons that build on top of it. These are implemented as "npm workspaces" and `esbuild` is used to generate the library packages. 
* Defined the process of building the libraries from a root application through npm scripts. 
* Created initial addons for `loki`, `midi`
* Currently working on foundational `net` state and pub/sub services

