#!/bin/bash
curl -H "authorization: $2" $3/api/upload -F "file=@$1;type=$(file --mime-type -b "$1")" -H 'content-type: multipart/form-data' --output response.json --silent --show-error | jq -r .files[0].url
