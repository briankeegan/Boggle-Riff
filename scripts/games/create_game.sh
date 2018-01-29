#!/bin/bash

# TOKEN=BAhJIiVkMmQwYTY1Yjg3MzcyMDQwODE1NDI3YjA2MjIyNDVmYQY6BkVG--7af6df9a4b7720a1a78fe80caecfb7f27a581f53 sh scripts/games/create_game.sh

curl "http://localhost:4741/games" \
  --include \
  --request POST \
  --header "Authorization: Token token=$TOKEN"

echo
