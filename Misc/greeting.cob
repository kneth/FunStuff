      * Greeting to Grace Hopper
       IDENTIFICATION DIVISION.
       PROGRAM-ID.    greeting.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WS-TODAY PIC X(21).
       01 WS-YEAR  PIC 9(4).

       PROCEDURE DIVISION.
       010-Greet.
           MOVE FUNCTION CURRENT-DATE TO WS-TODAY.
           MOVE WS-TODAY (1:4) TO WS-YEAR.
           
           SUBTRACT 1906 FROM WS-YEAR.
           DISPLAY "Happy birthday"
           DISPLAY WS-YEAR
           EXIT PROGRAM
           .
       STOP RUN.
