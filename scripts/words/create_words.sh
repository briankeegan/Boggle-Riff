#!/bin/bash

# ID=1 GAME_ID=1 WORD="SAGE,SAG" TOKEN=BAhJIiVkMmQwYTY1Yjg3MzcyMDQwODE1NDI3YjA2MjIyNDVmYQY6BkVG--7af6df9a4b7720a1a78fe80caecfb7f27a581f53 sh scripts/words/create_words.sh

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
