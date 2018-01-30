#!/bin/bash

# PLAYER=1 GAME_ID=4 WORD="SAGE,SAG" TOKEN=BAhJIiU5NGNiNDFlYjZlODMxNGNlYmNlZjA2YWZhYjUxMWRjZgY6BkVG--93d0815a4c78661ef7f037181c212a21b0269195 sh scripts/words/create_words.sh

curl "http://localhost:4741/words" \
  --include \
  --request POST \
  --header "Authorization: Token token=$TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "word": {
      "word": "'"${WORD}"'",
      "game_id": "'"${GAME_ID}"'",
      "player_id": "'"${PLAYER}"'"
    }
  }'

echo
