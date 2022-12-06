#!/bin/sh

PS1="\[\e[00;34m\]λ \W \[\e[0m\]"
git_root=$(git rev-parse --show-toplevel)

# --------------------------------------------------

cowsay -e '^^' -f small "Welcome :)"; echo;
