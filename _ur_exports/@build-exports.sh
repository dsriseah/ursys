#!/bin/sh

# TERMINAL COLORS
YEL=$(tput setaf 3)
BLU=$(tput setaf 4)
BGBLU=$(tput setab 4)$(tput setaf 7)
BRI=$(tput bold)
DIM=$(tput dim)
RST=$(tput sgr0)
GRN=$(tput setaf 2)

# DIRECTORY DETECTION
ROOT=$(pwd)
# path to the npm-scripts directory relative to ROOT

# print URSYS build info from git data
GIT_D=$(git log -1 --format=%cd --date=format:%Y/%m/%d)
GIT_B=$(git branch --show-current)

# BUILD LIBRARIES
printf "\n"
printf "${DIM}building URSYS Library from branch ${RST}${GIT_B}${DIM} commit date ${RST}${GIT_D}${RST}\n"
npx rollup -c rollup.web.mjs
npx rollup -c rollup.node.mjs

# BUILD URSYS TYPES
printf "\n"
printf "${DIM}building URSYS types${RST}\n"
printf "\n"
printf "${BLU}../_ur_exports/dist/types/web-client, /types/common${RST}\n"
npx tsc --emitDeclarationOnly --outDir dist/types -p tsconfig-types-client.json
printf "${GRN}created ${BRI}dist/types/web-client, dist/types/common${RST}\n"
printf "\n"
printf "${BLU}../_ur_exports/dist/types/node-server, /types/common${RST}\n"
npx tsc --emitDeclarationOnly --outDir dist/types -p tsconfig-types-server.json
printf "${GRN}created ${BRI}dist/types/node-server${RST}\n"
printf "\n"

