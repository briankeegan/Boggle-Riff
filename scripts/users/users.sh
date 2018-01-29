#!/bin/bash

curl "http://localhost:4741/users" \
  --include \
  --request GET \
  --header "Authorization: Token token=${TOKEN}"

echo

# TOKEN=BAhJIiUwNmZlNzRhYWIyOWU5NmZmMTg1ZGZiM2ZlYzMyNjAzNAY6BkVG--dcc3bedef46f5d7df696d9977375d8e1a1f0b609 sh scripts/users/users.sh
