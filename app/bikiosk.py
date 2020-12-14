#!/usr/bin/python3

import tailer

path = '/home/trmuser/x/ff-reload'

for line in tailer.follow( open( path ) ):
    ls = line.strip()
    sys.stdout.buffer.write( ls )
    sys.stdout.buffer.flush()
