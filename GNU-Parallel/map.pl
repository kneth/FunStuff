#!/usr/bin/perl -w

use strict;

my %dests;
while (<>) {
    my @data = split /,/;
    my $airport = $data[14];
    $dests{$airport} = 0 if (not exists $dests{$airport});
    $dests{$airport}++
}

foreach my $airport (keys %dests) {
    printf "$airport $dests{$airport}\n";
}
