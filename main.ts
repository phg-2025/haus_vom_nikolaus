/**
 * Das ist das Haus vom Nikolaus
 * 
 * Taste A: Punkt bzw. Linie wechseln
 * 
 * Taste B: Punkt bzw. Linie auswählen
 * 
 * Taste A+B: Automatische Lösung
 * 
 * Näheres bei Wikipedia oder demnächst bei 
 * 
 * https://www.prof-horst-guenther.de/calliope
 */
function istGesperrt (von: number, nach: number) {
    temp = von * 5 + nach
    return gesperrt[temp]
}
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    if (Start == 0) {
        Punkt(aktiv, 1)
        aktiv = nächsterWert(aktiv)
        Punkt(aktiv, 0)
    } else {
        Linie(aktiv, Ziel, 0)
        Ziel = nächsterWert(Ziel)
        while (istGesperrt(aktiv, Ziel)) {
            Ziel = nächsterWert(Ziel)
        }
        Linie(aktiv, Ziel, 1)
    }
})
function Tausche () {
    hilf1 = x1
    x1 = x2
    x2 = hilf1
    hilf1 = y1
    y1 = y2
    y2 = hilf1
}
function sperre (von: number, nach: number) {
    temp = von * 5 + nach
    gesperrt[temp] = true
    temp = nach * 5 + von
    gesperrt[temp] = true
}
function Punkt (Nr: number, klein: number) {
    x0 = x[Nr]
    y0 = y[Nr]
    if (klein == 0) {
        x0 += -2
        y0 += -2
        Quadrat(x0, y0, 1)
    } else {
        x0 += -2
        y0 += -2
        Quadrat(x0, y0, 0)
    }
}
input.onButtonEvent(Button.AB, input.buttonEventClick(), function () {
    Automatik()
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    Zug += 1
    if (Start == 0) {
        Ziel = nächsterWert(aktiv)
        Linie(aktiv, Ziel, 1)
        Start = 1
    } else {
        sperre(aktiv, Ziel)
        Linie(aktiv, Ziel, 2)
        Punkt(aktiv, 1)
        aktiv = Ziel
        Punkt(aktiv, 0)
        Ziel = nächsterWert(Ziel)
        hilf1 = 0
        while (istGesperrt(aktiv, Ziel)) {
            Ziel = nächsterWert(Ziel)
            hilf1 += 1
            if (hilf1 > 5) {
                GameOver()
            }
        }
        Linie(aktiv, Ziel, 1)
    }
})
function Zeichne_Linie (z0: number, s0: number, Art: number) {
    if (Art == 1) {
        pnkt += 1
        if (pnkt % 5 < 3) {
            kitronik_VIEW128x64.setPixel(z0, s0)
        }
    } else {
        if (Art == 2) {
            kitronik_VIEW128x64.setPixel(z0, s0)
        } else {
            kitronik_VIEW128x64.clearPixel(z0, s0)
        }
    }
}
function Automatik () {
    Linie(0, 1, 2)
    basic.pause(500)
    Linie(1, 4, 2)
    basic.pause(500)
    Linie(4, 3, 2)
    basic.pause(500)
    Linie(3, 2, 2)
    basic.pause(500)
    Linie(2, 1, 2)
    basic.pause(500)
    Linie(1, 3, 2)
    basic.pause(500)
    Linie(3, 0, 2)
    basic.pause(500)
    Linie(0, 4, 2)
}
function Quadrat (Zeile: number, Spalte: number, gross: number) {
    if (gross == 1) {
        hilf1 = 6
        d = 3
    } else {
        hilf1 = 3
        d = 2
    }
    for (let zl2 = 0; zl2 <= 6; zl2++) {
        for (let sp2 = 0; sp2 <= 6; sp2++) {
            kitronik_VIEW128x64.clearPixel(Zeile + zl2, Spalte + sp2)
        }
    }
    for (let zl = 0; zl <= hilf1; zl++) {
        for (let sp = 0; sp <= hilf1; sp++) {
            kitronik_VIEW128x64.setPixel(Zeile + zl, Spalte + sp)
        }
    }
    hilf1 = 0
}
function GameOver () {
    if (Zug >= 9) {
        basic.setLedColors(0x00ff00, 0x00ff00, 0x00ff00)
    } else {
        basic.setLedColors(0xff0000, 0xff0000, 0xff0000)
    }
}
function nächsterWert (Wert: number) {
    temp = Wert
    temp += 1
    temp = temp % 5
    return temp
}
function Linie (P1: number, P2: number, Art: number) {
    x1 = x[P1]
    y1 = y[P1]
    x2 = x[P2]
    y2 = y[P2]
    if (x1 > x2) {
        Tausche()
    }
    if (x1 == x2 && y1 > y2) {
        Tausche()
    }
    dy = y2 - y1
    dx = x2 - x1
    x0 = x1
    leer = 0
    pnkt = 0
    if (x1 == x2) {
        y0 = y1
        x0 = x1
        while (y0 < y2) {
            Zeichne_Linie(x0, y0, Art)
            y0 = y0 + 1
        }
    } else {
        while (x0 <= x2) {
            d = x0 - x1
            y0 = dy / dx
            y0 = y0 * d
            y0 = y0 + y1
            Zeichne_Linie(x0, y0, Art)
            x0 = x0 + 1
        }
    }
    basic.pause(100)
}
let leer = 0
let dx = 0
let dy = 0
let d = 0
let pnkt = 0
let Zug = 0
let y0 = 0
let x0 = 0
let y2 = 0
let y1 = 0
let x2 = 0
let x1 = 0
let hilf1 = 0
let temp = 0
let gesperrt: boolean[] = []
let y: number[] = []
let x: number[] = []
let Ziel = 0
let aktiv = 0
let Start = 0
let lösche = 0
Start = 0
aktiv = 0
Ziel = 1
x = [
40,
40,
59,
78,
78
]
y = [
59,
23,
5,
23,
59
]
gesperrt = []
for (let Index = 0; Index <= 25; Index++) {
    gesperrt.unshift(false)
}
sperre(0, 0)
sperre(1, 1)
sperre(2, 2)
sperre(3, 3)
sperre(4, 4)
sperre(0, 2)
sperre(2, 0)
sperre(4, 2)
sperre(2, 4)
