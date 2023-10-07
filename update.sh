#!/usr/bin/env bash
mkdir dl && butler fetch etmm/cleo:linux ./dl && cp ./dl/cleo ./dist
rm -rf dl