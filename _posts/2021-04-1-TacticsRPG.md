---
layout: project
title: "Tactics: RPG"
author: Siddhartha
permalink: /tactics-rpg/
type: "Self-project"
engine: "Unity"
language: "C#"
platform: "PC"
description: "An Isometric Tactics RPG inspired by games such as Final Fantasy Tactics. Includes team-based battle system and custom pathfinding."
image: "/assets/projects/tactics0.jpg"
---

An Isometric Tactics RPG made in the Unity game engine. Currently, the project is not hosted anywhere. The project is inspired by Tactical turn-based JRPGs such as Final Fantasy Tactics for SNES.

There will be a grid of tiles which makes up our game map. We will place our player party on the map with enemy characters already placed there. The characters would take turns moving on the map and taking part in combat with the other characters. The player has to defeat all characters in the enemy team to win.

The main mechanics which were developed for the project include:- 
- A 10 X 10 map grid with configurable settings for:
  - Active tile
  - Height of the tile
  - Obstacles

<img class="article-screenshot" src="/assets/projects/tactics0.jpg" alt=""/>

- The user can create levels manually or use a level generator by defining the settings of each tile in the map grid.

- Enemies with pathfinding on the grid. This involves creating a history of all the tiles with their neighbouring tiles. Based on the character and obstacle positions, the tiles can have the following states:-
  - Occupied (by another player character)
  - Blocked (by obstacle or enemy)
  - Unavailable (no tile present)
  - Free.

<img class="article-screenshot" src="/assets/projects/tactics1.jpg" alt=""/>

- Colored Tiles to display available tiles. The pathfinding algorithm would set the state of a tile as free or occupied and the color would be displayed as such.
- Turn-based Battle System based on a Speed parameter of all the characters in the Battle. All the characters are ranked based on the speed parameter and move accordingly.

<img class="article-screenshot" src="/assets/projects/tactics2.jpg" alt=""/>

- A Dynamic NavMesh which is created at runtime after level instantiation of the grid and before enemy placement. This is done as the level is instantiated at runtime.
