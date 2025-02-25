#!/bin/sh

# TERMINAL COLORS
YEL=$(tput setaf 3)
BLU=$(tput setaf 4)
BGBLU=$(tput setab 4)$(tput setaf 7)
BRI=$(tput bold)
DIM=$(tput dim)
RST=$(tput sgr0)

# DIRECTORY DETECTION
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

# print URSYS build info from git data
GIT_D=$(git log -1 --format=%cd --date=format:%Y/%m/%d)
GIT_B=$(git branch --show-current)
printf "${DIM}building URSYS Library from branch ${RST}${GIT_B}${DIM} commit date ${RST}${GIT_D}${RST}\n"
# change to root directory of the project before runing tsx
cd $ROOT
printf "${DIM}--> cd ${ROOT}${RST}\n"
# (1) always build library first
npx tsx $DIR/@build-core.mts 2>&1 | cat
# (2) add additional tasks here (eventually can be command args)
npx tsx $DIR/@build-addons.mts 2>&1 | cat

# return to the original directory
cd - 2>&1 >/dev/null
printf "${DIM}<-- cd ${ROOT}${RST}\n"



