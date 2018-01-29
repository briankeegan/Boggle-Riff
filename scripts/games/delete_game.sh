#!/bin/bash

# ID=2 TOKEN=BAhJIiU4YjY0ZmI2OGFjZjEzZDI2YTQxYjhhZjI3Y2RkOWI3ZQY6BkVG--3f8aabd812967735ae9316aa43d116a1a938ced0 sh scripts/games/delete_game.sh

curl "http://localhost:4741/games/${ID}" \
  --include \
  --request DELETE \
  --header "Authorization: Token token=$TOKEN"

echo
