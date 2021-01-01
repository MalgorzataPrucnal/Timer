# Praca domowa - 3
[Stoper](src/index.html)

Z powodu panującej pandemii pozamykane zostały siłownie i strasznie mi do nich tęskno.

Na tyle, że potrzebuję od Ciebie aplikacji, która ma działać jak Stoper :)

Wymagane funkcjonalności

Start - Odpalenie czasomierza

Stop - Zatrzymanie na obecnym wyniku

Pauza - Zapauzowanie

Reset - Reset wyników bez zapisywania

Next - Odpalenie dodatkowego czasomierza, a poprzedni czas jest wyświetlony poniżej. (Symulacja tego, że ktoś już dobiegł na metę i odliczamy dalej czas dla kolejnej nadchodzącej osoby)

Save - Zapisanie danych w localStorage

## Zależności, które powinny zostać uwzględnione

* Nie mogę nacisnąć przycisku **Save** dopóki nie nacisnąłem **Stop**
* Po naciśnięciu **Pause** mogę wznowić licznik używając **Start** lub **Pause**
* Po naciśnięciu **Save** czyścimy obecne czasy i stoper jest do ponownego użycia

## Zapisywanie wyników

Wyniki powinny zostać zapisane w localStorage.

Chciałbym mieć możliwość nadania nazwy dla wpisu.

Chciałbym żeby wyświetlanie wyników korzystało z feature'u akordeon, czyli klikam w **nazwę** wpisu i wyjeżdżają mi czasy zapisane pod tym wpisem :)

## Bonus

* Wyświetlanie czasu jak w prawdziwych stoperach (setne sekund)
* Przycisk **STOP** jest widoczny dopiero po naciśnięciu **START**
* Przycisk **SAVE** jest widoczny dopiero po naciśnięciu **STOP**

### Extra Bonus

* Zapisywanie danych w Firebase

## Punktacja

Działający Stoper i wszystkie funkcjonalności: 8 pkt

Funkcjonalności START, PAUSE, RESET: 3 pkt (czyli bez NEXT, bez zapisywania i STOP, bieda wersja po prostu)

Bonusy: 3 pkt

Extra Bonus: 1 pkt

## **TERMIN 10.01.2021 14:00**
