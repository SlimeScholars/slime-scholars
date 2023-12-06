#!/bin/bash
npm i -g corepack
# echo "corepack enabled from prebuild TT"
yarn install
# echo "yarn install ran from prebuild TT"
yarn build
# echo "yarn build ran from prebuild TT"
# npm install
# echo "npm install ran lol from prebuild"
# ls -la
