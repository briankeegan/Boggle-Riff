#!/bin/bash

# ID=1 sh scripts/games/get_one_game.sh

curl "http://localhost:4741/games/${ID}" \
  --include \
  --request GET

echo
