###
# Draw some shapes on the console
# Copyright (c) 2014, Robert Eisele (robert@xarg.org)
# Dual licensed under the MIT or GPL Version 2 licenses.
###

draw = (size, cb) ->
  chars = [ ":", "O" ]

  for i in [0 .. size - 1] by 1
    for j in [0 .. size - 1] by 1
      process.stdout.write(chars[Number(cb(i, j, size))])
    process.stdout.write("\n")
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

