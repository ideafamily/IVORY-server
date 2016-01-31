#!/bin/bash
while read line; do export "$line";
done < .devenv;
node lib/index;
