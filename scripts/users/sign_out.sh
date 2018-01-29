#!/bin/bash

curl "http://localhost:4741/sign-out" \
  --include \
  --request DELETE \
  --header "Authorization: Token token=$TOKEN"

echo

# TOKEN=<PASTE_TOKEN_HERE> sh scripts/users/sign_out.sh
