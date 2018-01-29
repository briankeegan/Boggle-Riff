#!/bin/bash

# EMAIL=black PASS=jack PASS2=jack sh scripts/users/sign_up.sh

curl "http://localhost:4741/sign-up" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "'"${EMAIL}"'",
      "password": "'"${PASS}"'",
      "password_confirmation": "'"${PASS2}"'"
    }
  }'

echo
