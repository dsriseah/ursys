#!/bin/sh

# TERMINAL COLORS
YEL=$(tput setaf 3)
BLU=$(tput setaf 4)
BGBLU=$(tput setab 4)$(tput setaf 7)
BRI=$(tput bold)
DIM=$(tput dim)
RST=$(tput sgr0)

# DIRECTORY DETECTION
CPWD=$(pwd)
# root directory has the .nvmrc file in it
ROOT=$(pwd)
while [ ! -f "$ROOT/.nvmrc" ]; do
    ROOT=$(dirname "$ROOT")
    if [ "$ROOT" = "/" ]; then
        echo "ERROR: .nvmrc file not found"
        exit 1
    fi
done
# path to the npm-scripts directory relative to ROOT
DIR="$ROOT/_ur/npm-scripts"

# BUILD OPTIONS
TSOPTS="--transpile-only" # use --no-cache to force a full rebuild tsnode (disables typecheck)

# print URSYS build info from git data
GIT_D=$(git log -1 --format=%cd --date=format:%Y/%m/%d)
GIT_B=$(git branch --show-current)
printf "${DIM}building URSYS Library from branch ${RST}${GIT_B}${DIM} commit date ${RST}${GIT_D}${RST}\n"
printf "${DIM}building URSYS Library from branch ${RST}${GIT_B}${DIM} commit date ${RST}${GIT_D}${RST}\n"
# change to root directory of the project before runing ts-node-esm
cd $ROOT
printf "${DIM}--> cd ${ROOT}${RST}\n"
# (1) always build library first
npx ts-node-esm $TSOPTS $DIR/@build-core.mts 2>&1 | cat
# (2) add additional tasks here (eventually can be command args)
npx ts-node-esm $TSOPTS $DIR/@build-addons.mts 2>&1 | cat
# return to the original directory
cd - 2>&1 >/dev/null
printf "${DIM}<-- cd ${CPWD}${RST}\n"



