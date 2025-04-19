#!/bin/sh
# URTEST is a CLI development task runner that invokes the URSYS CLI build library
# it lives inside of the _ur directory

# Portable Echo
prln() {
  printf "%s\n" "$*"
}

# Select ts-node-esm or tsx typescript-aware node runner
# NODEXEC="npx ts-node-esm --transpile-only"
NODEXEC="npx tsx "

# PATH SETTINGS
SCRIPT_DIR=$(dirname "$(realpath "$0")")
UR_BUILD="$SCRIPT_DIR/"
CLI_BUILD="$SCRIPT_DIR/npm-scripts"
ADDONS_LIB="$SCRIPT_DIR/../_ur_addons"
TEST_BUILD="$SCRIPT_DIR/../_ur_addons/loki"
UR_EXPORTS="$SCRIPT_DIR/../_ur/_dist"

# TERMINAL COLORS
DIM=$(tput dim)
YELLOW=$(tput setaf 3)
RESET=$(tput sgr0)
BGBLUE=$(tput setab 4)$(tput setaf 7)
BRITE=$(tput bold)

# Make sure NodeJS is installed
if ! command -v node > /dev/null 2>&1; then
    prln "Node.js not found. Please ensure it's installed."
    exit 1
fi


#
# USAGE
# 
usage() {
    COMMANDS="build | package"
    ADDONS=""
    a_dirs=$(find "$ADDONS_LIB" -mindepth 1 -maxdepth 1 -type d -name "[!_]*" -exec basename {} \;)
    a_dirs=$(prln "$a_dirs" | tr '\n' ' ')
    for dir in $a_dirs; do
      if [ "$dir" != "node_modules" ]; then
        ADDONS="$ADDONS $dir"
      fi
    done
    ADDONS=$(prln $ADDONS)
    ADDONS=$(echo "$ADDONS" | fold -s -w 40 | sed '1!s/^/           /')
    prln "usage:     ${yellow}ur [command | addon]${RESET}${DIM}"
    prln "commands   $COMMANDS"
    prln "addons     $ADDONS"
    prln "${RESET}"
    exit 1
}
#
# If no arguments provided or unknown option, display usage
#
if [ $# -eq 0 ]; then
  prln ""
  prln "Sri's ${YELLOW}${BRITE}Universal Realtime System${RESET} (URSYS) is a framework"
  prln "for developing realtime web applications and libraries"
  prln "with visual studio code, nodejs, and typescript"
  prln ""
  usage
fi

#
# handle built-in commands
# note: Use --max-old-space-size to limit memory (values are in MB, so 128 is 128MB)
#
case "$1" in
    # build will build the core and all addons to _exports/_out
    # to make them available for use in dependent projects like addons and other
    # local hosted projects (e.g. sna-example, app-example) you must run 
    # ur package to copy the built files to _exports/core and _exports/sna
    build)
        # (1) always build library first
        $NODEXEC $CLI_BUILD/@build-core.mts 2>&1 | cat
        # (2) build standalone SNA module
        $NODEXEC $CLI_BUILD/@build-sna.mts 2>&1 | cat
        # (3) add additional tasks here (eventually can be command args)
        # $NODEXEC $CLI_BUILD/@build-addons.mts 2>&1 | cat
        exit 0;
        ;;

    # copies the current files in _out to _exports/core and _exports/sna
    # which are references in the root package.json exports section
    package)
        # run build first
        $NODEXEC $CLI_BUILD/@build-core.mts 2>&1 | cat
        # $NODEXEC $CLI_BUILD/@build-sna.mts 2>&1 | cat
        # create tarball using npm pack on root package.json
        $NODEXEC $CLI_BUILD/@pack-libraries.mts 2>&1 | cat
        exit 0;
        ;;

    # WIP
    test:code)
        # get additional argument after 'test' into $option
        $NODEXEC $CLI_BUILD/@build-core.mts 2>&1 | cat
        PROMPT="${BGBLUE} UR TEST ${RESET}"
        if [ "$2" = "core" ]; then
            prln "${PROMPT} running ${BRITE}ursys core tests${RESET}"
            npx vitest --config ./tests/vitest.core.config.mts
        elif [ "$2" = "addons" ]; then
            prln "${PROMPT} running ${BRITE}ursys addons tests${RESET}"
            npx vitest --config ./tests/vitest.addons.config.mts
        elif [ "$2" = "webplay" ]; then
            prln "${PROMPT} running ${BRITE}ursys webplay tests${RESET}"
            npx vitest --config ./tests/vitest.webplay.config.mts
        elif [ -z "$2" ]; then
            prln "${PROMPT} running ${BRITE}ursys core and addon tests${RESET}"
            npx vitest --config ./tests/vitest.all.config.mts
        else
            prln "${YELLOW}unknown test option: '$2'${RESET}"
            exit 1;
        fi
        exit 0;
        ;;

    # new:addon will create a new addon in the _ur_addons directory
    new:addon)
        # get additional argument after 'new' into $option
        prln ""
        if [ -z "$2" ]; then
            prln "${BGBLUE} new:addon ${RESET} ${BRITE}Provide short addon name.${RESET} Use ${YELLOW}x-${RESET} prefix for user addons that will be"
            prln "excluded from the main URSYS repo (e.g. x-myaddon)"
            prln ""
            exit 1;
        fi
        # make sure the addon doesn't already exist
        if [ -d "$ADDONS_LIB/$2" ]; then
            prln "${BGBLUE} new:addon ${RESET} $2 already exists"
            prln ""
            exit 1;
        fi
        # clone the addon template and remove the .git directory
        git clone --depth 1 https://github.com/dsriseah/ursys-x-sna-addon.git $ADDONS_LIB/$2
        rm -fr $ADDONS_LIB/$2/.git
        if [ "${2:0:2}" = "x-" ]; then
            prln "${BGBLUE} new:addon ${RESET} created new user addon: $2"
        else
            prln "${BGBLUE} new:addon ${RESET} created new addon: $2"
        fi
        cd $ADDONS_LIB/$2
        prln ""
        exit 0;
        ;;
esac

#
# if we got this far, then none of the built-in commands above were run, so 
# load the designated addon directory in $1 and pass the remaining arguments
# to our loader scripts
# build the core first, then load the addon
$NODEXEC $CLI_BUILD/@build-core.mts 2>&1 | cat
$NODEXEC $ADDONS_LIB/@load-addon.mts "$@"
