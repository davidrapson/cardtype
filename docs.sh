#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

git push origin `git subtree split --prefix docs master`:gh-pages --force
