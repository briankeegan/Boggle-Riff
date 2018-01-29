#!/bin/bash

# sh scripts/games/get_all_games.sh

curl "http://localhost:4741/games" \
  --include \
  --request GET

echo
