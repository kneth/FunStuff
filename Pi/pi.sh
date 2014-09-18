#!/bin/bash
#
# Usage: pi.sh [iterations]
#

if [ -z "$1" ]; then
    NSTEPS=500
else
    NSTEPS=$1
fi

NHITS=0
i=0
while [ $i -lt $NSTEPS ]; do
    x=$(echo $RANDOM/32767 | bc -l)
    y=$(echo $RANDOM/32767 | bc -l)
    d=$(echo "sqrt($x*$x+$y*$y) < 1.0" | bc -l)
    if [ $d -eq 1 ]; then
	NHITS=$(($NHITS + 1))
    fi
    i=$(($i + 1))
done

PI=$(echo "4.0*$NHITS/$NSTEPS" | bc -l)
echo "PI = $PI"
