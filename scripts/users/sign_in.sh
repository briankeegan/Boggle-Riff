#!/bin/bash

# EMAIL=black PASS=jack sh scripts/users/sign_in.sh

curl "http://localhost:4741/sign-in" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "'"${EMAIL}"'",
      "password": "'"${PASS}"'"
    }
  }'

echo
