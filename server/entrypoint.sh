#!/bin/sh
set -eux

yarn run-migrations

# This will exec the CMD from your Dockerfile, i.e. "npm start"
exec "$@"
