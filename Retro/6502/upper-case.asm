    ;; Convert string to upper case - string is terminated by NULL

    .alias LOWERA 97
    .alias LOWERZ 122
    .alias DELTA 97 - 65
    .org $0300

start:
    LDX #0                      ; X = 0
loop:
    LDA string,X                ; ACC = string[X]
    BEQ done                    ; if ACC = 0 goto done

    CMP #LOWERA
    BCC next
    CMP #LOWERZ
    BEQ flip
    BCS next
flip:
    CLC
    SBC #DELTA - 1              ; carry flag is cleared!
    STA string,X
next:
    INX
    JMP loop

done:
    RTS

string: .byte "Alt om Data",0
