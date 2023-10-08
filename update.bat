mkdir dl && butler fetch etmm/cleo:win ./dl && xcopy /s/y .\dl\cleo.exe .\dist
RD /S /Q .\dl