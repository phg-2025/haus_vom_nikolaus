def istGesperrt(von: number, nach: number):
    global temp
    temp = von * 5 + nach
    return gesperrt[temp]

def on_button_a():
    global aktiv, Ziel
    if Start == 0:
        Punkt(aktiv, 1)
        aktiv = nächsterWert(aktiv)
        Punkt(aktiv, 0)
    else:
        Linie(aktiv, Ziel, 0)
        Ziel = nächsterWert(Ziel)
        while istGesperrt(aktiv, Ziel):
            Ziel = nächsterWert(Ziel)
        Linie(aktiv, Ziel, 1)
input.on_button_event(Button.A, input.button_event_click(), on_button_a)

def Tausche():
    global hilf1, x1, x2, y1, y2
    hilf1 = x1
    x1 = x2
    x2 = hilf1
    hilf1 = y1
    y1 = y2
    y2 = hilf1
def Punkte():
    for Index in range(5):
        Punkt(Index, 1)
def sperre(von2: number, nach2: number):
    global temp
    temp = von2 * 5 + nach2
    gesperrt[temp] = True
def Punkt(Nr: number, klein: number):
    global x0, y0
    x0 = x[Nr]
    y0 = y[Nr]
    if klein == 0:
        x0 += -2
        y0 += -2
        Quadrat(x0, y0, 1)
    else:
        x0 += -2
        y0 += -2
        Quadrat(x0, y0, 0)

def on_button_ab():
    pass
input.on_button_event(Button.AB, input.button_event_click(), on_button_ab)

def on_button_b():
    global Ziel, Start, aktiv
    if Start == 0:
        Ziel = nächsterWert(aktiv)
        Linie(aktiv, Ziel, 1)
        Start = 1
    else:
        aktiv = Ziel
input.on_button_event(Button.B, input.button_event_click(), on_button_b)

def TesteGesperrt():
    if istGesperrt(1, 1):
        basic.show_number(1)
    else:
        basic.show_number(0)
    basic.pause(1000)
    if istGesperrt(3, 4):
        basic.show_number(1)
    else:
        basic.show_number(0)
    basic.pause(1000)
    if istGesperrt(0, 2):
        basic.show_number(1)
    else:
        basic.show_number(0)
    basic.pause(1000)
def Zeichne_Linie(z0: number, s0: number, Art: number):
    global pnkt
    if Art == 1:
        pnkt += 1
        if pnkt % 5 < 3:
            kitronik_VIEW128x64.set_pixel(z0, s0)
    else:
        if Art == 2:
            kitronik_VIEW128x64.set_pixel(z0, s0)
        else:
            kitronik_VIEW128x64.clear_pixel(z0, s0)
def Automatik():
    Linie(0, 1, 1)
    Linie(1, 4, 1)
    Linie(4, 3, 1)
    Linie(3, 2, 1)
    Linie(2, 1, 1)
    Linie(1, 3, 1)
    Linie(3, 0, 1)
    Linie(0, 4, 1)
def Quadrat(Zeile: number, Spalte: number, gross: number):
    global hilf1, d
    if gross == 1:
        hilf1 = 6
        d = 3
    else:
        hilf1 = 3
        d = 2
    for zl2 in range(7):
        for sp2 in range(7):
            kitronik_VIEW128x64.clear_pixel(Zeile + zl2, Spalte + sp2)
    zl = 0
    while zl <= hilf1:
        sp = 0
        while sp <= hilf1:
            kitronik_VIEW128x64.set_pixel(Zeile + zl, Spalte + sp)
            sp += 1
        zl += 1
    hilf1 = 0
def nächsterWert(Wert: number):
    global temp
    temp = Wert
    temp += 1
    temp = temp % 5
    return temp
def Linie(P1: number, P2: number, Art2: number):
    global x1, y1, x2, y2, dy, dx, x0, leer, pnkt, y0, d
    x1 = x[P1]
    y1 = y[P1]
    x2 = x[P2]
    y2 = y[P2]
    if x1 > x2:
        Tausche()
    if x1 == x2 and y1 > y2:
        Tausche()
    dy = y2 - y1
    dx = x2 - x1
    x0 = x1
    leer = 0
    pnkt = 0
    if x1 == x2:
        y0 = y1
        x0 = x1
        while y0 < y2:
            Zeichne_Linie(x0, y0, Art2)
            y0 = y0 + 1
    else:
        while x0 <= x2:
            d = x0 - x1
            y0 = dy / dx
            y0 = y0 * d
            y0 = y0 + y1
            Zeichne_Linie(x0, y0, Art2)
            x0 = x0 + 1
    basic.pause(100)
leer = 0
dx = 0
dy = 0
d = 0
pnkt = 0
y0 = 0
x0 = 0
y2 = 0
y1 = 0
x2 = 0
x1 = 0
hilf1 = 0
temp = 0
gesperrt: List[bool] = []
y: List[number] = []
x: List[number] = []
Ziel = 0
aktiv = 0
Start = 0
oledssd1306.init_display()
oledssd1306.clear_display()
lösche = 0
Start = 0
aktiv = 0
Ziel = 1
x = [40, 40, 59, 78, 78]
y = [59, 23, 5, 23, 59]
gesperrt = []
for Index2 in range(26):
    gesperrt.unshift(False)
sperre(0, 0)
sperre(1, 1)
sperre(2, 2)
sperre(3, 3)
sperre(4, 4)
sperre(0, 2)
sperre(2, 0)
sperre(5, 2)
sperre(2, 5)
Punkte()
Punkt(0, 0)