    ;; Length of string - terminated by NULL
    ;;
    ;; References
    ;; * Mikroprocessorer - arkitektur, instruktioner og adresseringsmetoder. Jens Grysbjerg. Teknik Forlag, 1986.

    .alias MAXCHR 80

    .org $0300

start:
    LDX #0
igen:
    CMP string,X
    BEQ fundet
    INX
    CPX #MAXCHR
    BCC igen
    CLC
fundet:
    RTS

string: .byte "AoD",0
