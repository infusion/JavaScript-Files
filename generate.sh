#!/bin/bash

# A simple helper file for Google Closure compiler
#
# Copyright (c) 2011, Robert Eisele (robert@xarg.org)
# Dual licensed under the MIT or GPL Version 2 licenses.

# Usage: ./generate.sh input.js output.js

curl --silent -d"compilation_level=ADVANCED_OPTIMIZATIONS&output_format=text&output_info=compiled_code" --data-urlencode "js_code@$1" \
http://closure-compiler.appspot.com/compile -o x

gzip -9 -c x > "$2.gz"
mv x "$2"

echo "Done!"
