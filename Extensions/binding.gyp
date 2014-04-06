{
    'variables': {
        'sources': [ '<!@(ls *.cpp)' ],
        'cflags':  [ '-frtti', '-fexceptions', '-Wall', '-Wextra', '-ansi',
                     '-pedantic', '-Wno-long-long', '-Wno-unused-parameter' ]
    },
    'targets': [
        {
            'target_name': 'funstuff',
            'cflags_cc': [ '-O3', '-DNDEBUG', '<@(cflags)' ],
            'sources':   [ '<@(sources)' ],
            'libraries': [ ],
            'xcode_settings': {
                'OTHER_CFLAGS': [ '-O3', '-DNDEBUG', '<@(cflags)' ]
            }
        }
    ]
}
