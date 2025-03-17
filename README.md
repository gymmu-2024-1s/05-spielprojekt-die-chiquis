[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/xlB9Yfq8)
# Demo Spiel mit Phaser 3

In diesem Projekt erarbeiten wir ein Demo Spiel mit der Game-Engine Phaser. Als
Hilfmittel für das Spiel dient das
[Informatik-Skript](https://gymmu.github.io/gym-inf/game). Dort finden Sie auch
Videos in denen der Inhalt aus dem Skript erklärt wird, sowie der Code um mit
der Game-Engine umzugehen.

## Projekt starten

Auch bei diesem Projekt brauchen wir einen Webserver um alle benötigten Dateien
an den Benutzer zu liefern. Diesen können Sie wie auch schon in den anderen
Projekten mit folgendem Befehl aus dem Terminal starten.

```bash
npm run dev
```

## Struktur der Projekts

Das Projekt ist wie folgt aufgeteilt um die Dinge die nicht zusammen gehören von
einander zu trennen, und aber auch um einen Standart für Spielressourcen zu
haben, bei dem man sich im Projekt einfach orientieren kann.

- `src`: Hier ist alles drin was mit Javascript zu tun hat. Alles was mit dem
  Spiel zu tun hat, finden Sie unter `src/game`. Alle weiteren Unterordner
  sollten selbsterklärend sein.

- `public/assets`: Hier finden Sie alle Ressourcen die im Spiel verwendet
  werden. Es ist wichtig das diese zumindest im Ordner `public` sind, sonst
  werden Sie vom Webserver nicht gefunden. Alle Unterordner sollten auch hier
  selbsterklärend sein.

- `tiled`: Hier werden die Dateien für den
  [Karteneditor Tiled](https://mapeditor.org) gespeichert. Der Karteneditor
  speichert seine Konfiguration in Textdateien ab. Wir können diese also einfach
  zum Repository hinzufügen, so das wir unsere Karten auch auf Git abspeichern
  können. Um die Karten im Spiel zu verwenden, müssen diese dann nach
  `public/assets/maps/` exportiert werden.

- `asprite`: Hier werden die Bilder/Tilesets gespeichert, die wir mit dem
  Bildbearbeitungsprogramm [Libresprite](https://libresprite.github.io/#!/)
  bearbeiten. Auch hier müssen fertige Bilder wieder exportiert werden.

  **Achtung**: Damit Tilesets mit verschiebender Kamera richtig dargestellt
  werden können, müssen diese _extruded_ werden. Sie brauchen also einen Rand
  und einen Abstand zueinander. Das kann mit folgendem Befehl gemacht werden:

  ```bash
  ./node_modules/tile-extruder/bin/tile-extruder -w 32 -h 32 -m 1 -s 2 -i <Eingabe-Datei> -o <Ausgabe-Datei>
  ```

  Dabei müssen Sie den genauen Pfad für die Eingabe-Datei haben, also
  `asprite/tileset-winter.png` oder so ähnlich. und bei der Ausgabe-Datei muss
  dann folgendes hin `public/assets/tileset.winder.png`.

## Erste Schritte

Das Projekt ist leider noch nicht direkt Spielbereit. Sie müssen zuerst noch ein
paar Schritte selber machen. Weil das Projekt einer sehr spezifischen Struktur
folgt, ist es am besten wenn Sie die Schritte einfach von der
[Webseite hier](https://gymmu.github.io/gym-inf/game) übernehemen. Lesen aber
alles durch was Sie hier machen, Sie sollen später auch im Stande sein das ganze
selber zu machen.

# Spielprojekt

Dieses Repository bildet die Grundlage für ein Spielprojekt, das von Gruppen mit
jeweils vier Mitgliedern bearbeitet wird. Für die Umsetzung des Spiels wird die
Game-Engine [kaboom.js](https://kaboomjs.com/) verwendet.

## Veröffentlichen

Das Spiel ist direkt über Github-Pages verfügbar. Das müssen Sie in den
Einstellungen des Repositories aktivieren, und zwar müssen Sie dort auf
Github-Actions umstellen, der Rest passiert dann automatisch. Eine neue Version
der Webseite wird immer dann erstellt, wenn ein neuer `commit` auf dem `main`
Branch gemacht wird, bzw. wenn ein `merge` in den `main` Branch gemacht wird.

## Arbeitsweise

Wir möchten jeweils in den Lektionen möglichst viel erledigt bekommen, und dafür
müssen wir effizient arbeiten. Wir arbeiten dafür in 4 Phasen.

### Phase 1 (ca. 15 Min)

In der ersten Phase besprechen wir uns als Team was wir heute für Aufgaben
erledigen, wer mit wem an welchen Aufgaben arbeitet, welche Branches wir
erstellen und wann diese gemerged werden. Wir versuchen dabei möglichst klug mit
den Änderungen vor zu gehen, so das nicht zu viele Merge-Konflikte auftreten
werden.

In dieser Phase bearbeiten wir nur Aufgaben die wir in der Datei
[backlog.md](backlog.md) aufgelistet haben. Das Backlog wird dann mit neuen
Aufgaben gefüllt, wenn wir in der Phase 4 sind.

### Phase 2 (ca. 30 Min)

Dies ist unsere erste Arbeitsphase, diese dauert bis zur Pause. Wir arbeiten
alleine oder im Team an einem Auftrag aus dem Backlog, den wir in der Phase 1
ausgesucht haben. Die ganze Arbeit wir in einem eigenen Branch gemacht. Der
Branch wird gemerged sobald die Arbeit fertig ist. Koordinieren Sie sich hier
jeweils mit Ihrer Gruppe, welche Branches zuerst gemerged werden sollen.
Versuchen Sie Branches nicht zur gleichen Zeit zu mergen.

In dieser Phase können auch Fragen gestellt werden, es muss aber auch gearbeitet
werden. Falls Sie lange warten müssen bis Ihre Frage geantwortet werden kann,
beschäftigen Sie sich mit einer weiteren Aufgabe (gestalten der Webseite, neue
Spritesheets, lesen der Dokumentation, einem Gruppenmitglied helfen beim
Programmieren)

### Pause

Tauschen Sie sich in der Pause ganz kurz darüber aus wie weit Sie gekommen sind,
kann bald gemerged werden, muss sonst etwas angepasst werden? Ansonsten sollen
Sie die Pause jedoch nutzen, es geht nur um den kurzen Austausch.

### Phase 3 (ca. 30 Min)

Dies ist unsere zweite Arbeitsphase. Hier wird sehr ähnlich zur ersten Phase
gearbeitet. Im besten Fall konnten Sie bereits einen Branch aus der ersten
Lektion mergen und die Aufgabe aus dem Backlog abhacken und nun eine weitere
Aufgabe beginnen. Es kann aber auch sein das Ihre Aufgabe länger dauert, und Sie
die ganze Zeit an einem Branch arbeiten. Wenn das der Falls ist, müssen Sie für
die Phase 4 genügend Zeit für den Merge einberechnen.

### Phase 4 (ca. 15 Min)

In dieser Phase versuchen wir alles was wir gemacht haben abzuschliessen und zu
mergen. Hier ist es wichtig das Sie im Team viel kommunizieren und sich über die
Reihenfolge von Merges Gedanken machen. Mergen Sie nicht mehrere Branches zur
gleichen Zeit!

Sind alle Branches gemerged, erstellen Sie eine neue Version mit den
Veränderungen die Sie gemacht haben. Erstellen Sie auch dafür einen neuen Branch
und beschreiben Sie die Änderungen, die Sie am Spiel gemacht haben, in der Datei
[changes.md](changes.md). Passen Sie die Datei [backlog.md](backlog.md) an, so
das erledigte Dinge abgehackt sind, und fügen Sie neue Aufgaben zum Backlog
hinzu.

Falls Sie mit einer Aufgabe nicht fertig geworden sind, also den Branch nicht
mergen konnten, machen Sie am Ende der Lektion einen Commit mit folgender
Nachricht:

```text
WIP

Dinge die noch erledigt werden müssen...
Schreiben Sie hier auf was Sie beim nächsten mal wieder wissen müssen, wenn Sie
daran weiter arbeiten.
```

Ganz am Ende lassen Sie dann im Termin noch den folgenden Befehl ausführen:

```bash
npm version minor
```

## Mergen

Hier wird kurz beschrieben wie Sie bei einem Merge vorgehen. Öffnen Sie die
Datei [backlog.md](backlog.md) und setzen Sie ein `x` bei Ihrer Aufgabe. Dann
können Sie einen letzten commit auf Ihrem branch machen, und diesen dann in den
`main` Branch mergen.

Wenn Konflikte auftreten, sollten dies immer nur Konflikte sein, die am selben
Tag erzeugt wurden. Sitzen Sie mit der Person zusammen, die bereits die
Änderungen gemacht hat, so dass Sie sicher alles richtig mergen können.

Testen Sie die Änderungen nach einem Merge unbedingt aus. Wenn alles
funktioniert hat, erstellen Sie eine neue Version in der Konsole, mit dem
Befehl:

```bash
npm version patch
```

Dann können Sie den `main` Branch pushen, und Ihren lokalen Branch löschen.

## Resourcen

Das Projekt ist ausführlich dokumentiert und sollte eine gute Anleitung bieten,
zusätzlich können Sie natürlich das Internet oder auch `Codeium` verwenden. Eine
hervorragende Quelle ist die Dokumentation von
[Phaser 3](https://docs.phaser.io/phaser/getting-started/what-is-phaser). Oder
aber auch die [Phaser Beispiele](https://phaser.io/examples/v3.85.0).

Wichtige Programme für die Bildbearbeitung sind
[Libresprite](https://libresprite.github.io/#!/) oder
[Gimp](https://www.gimp.org/). Sie können natürlich auch andere Software
benutzen die Sie bereits kennen.

Um die Levels bequem und einfach bearbeiten zu können, brauchen Sie den
Karteneditor [Tiled](https://www.mapeditor.org/)
