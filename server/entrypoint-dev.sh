#!/bin/sh
set -eux

npm run run-migrations --if-present && npm run seed --if-present

if command -v Xvfb &> /dev/null
then
    echo "COMMAND Xvfb found"
    Xvfb :99 -screen 0 1024x768x16 &
fi

# This will exec the CMD from your Dockerfile, i.e. "npm start"
exec "$@"
