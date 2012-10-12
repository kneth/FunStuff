#!/usr/bin/perl -w

use strict;

my %dests;
while (<>) {
    chomp;
    my ($airport, $count) = split / /;
    $dests{$airport} = 0 if (not exists $dests{$airport});
    $dests{$airport} += $count;
}

my $total = 0;
foreach my $airport (sort keys %dests) {
    $total += $dests{$airport};
    print "$airport $dests{$airport}\n";
}
print "Total: $total\n";
