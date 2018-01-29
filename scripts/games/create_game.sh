#!/bin/bash

# TOKEN=BAhJIiU3MWQzY2NlZjQzZTRkYTJiZTc4YWIzMTUwMTE0OGY2YgY6BkVG--4025cde29e392f6865a17765b3d57eccf5a86857 BOARD="S,A,G,B,L,Y,I,E,A,A,D,F,T,H,Y,I"  sh scripts/games/create_game.sh

curl "http://localhost:4741/games" \
  --include \
  --request POST \
  --header "Authorization: Token token=$TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "game": {
      "board_string": "'"${BOARD}"'"
    }
  }'

echo
