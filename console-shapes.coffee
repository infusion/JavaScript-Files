###
# Draw some shapes on the console
# Copyright (c) 2014, Robert Eisele (robert@xarg.org)
# Dual licensed under the MIT or GPL Version 2 licenses.
###


draw = (size, cb) ->
  chars = [ ":", "O" ]
  i = 0
  while i < size
    j = 0
    while j < size
      process.stdout.write(chars[Number(cb(i, j, size))])
      j++
    process.stdout.write("\n")
    i++
  console.log("\n\n\n")
  return



## Draw a triangle
draw 30, (r, c, s) ->
  r < c

## Draw a circle 
draw 30, (r, c, s) ->
  Math.pow(r - s / 2 + 1, 2) + Math.pow(c - s / 2 + 1, 2) < Math.pow(s / 2, 2)

## Draw a house
draw 30, (r, c, s) ->
  Math.abs(c - s / 2) < r

## Draw a card
draw 30, (r, c, s) ->
  Math.abs(r - s / 2) < Math.abs(c - s / 2)

## Draw a rhombus
draw 30, (r, c, s) ->
  t = Math.abs(r - (s - 1) / 2)
  t < c < s - t

## Draw a pyramid
draw 30, (r, c, s) ->
  Math.abs(2 * c - s + 1) <= r

