---
layout: project
title: "Tactics: RPG"
author: Siddhartha
permalink: /tactics-rpg/
type: "Self-project"
engine: "Unity"
language: "C#"
platform: "PC"
description: "Isometric Tactics RPG inspired by games such as Final Fantasy: Tactics. Includes designer tools for level generation, scriptable objects for characters, custom pathfinding implementation for grid traversal and refined turn-based flow."
image: "/assets/projects/tactics0.png"
---

An Isometric Tactics RPG made in the Unity game engine. The project is inspired by Tactical turn-based JRPGs such as Final Fantasy Tactics for the Playstation and Final Fantasy Tactics: Advance for the GameBoy Advance.

- Build: <a href="https://kingcrimson1112.itch.io/tactics-rpg">Tactics RPG</a>
- Source: <a href="https://github.com/sps1112/tactics-rpg">sps1112/tactics-rpg</a>

The game is divided into various missions which take place on a certain level. The level will be an isometric 3D grid made of blocks. We can place our place character at any of the spawning points at the start of the mission and then start. The enemy character will already be spawned before. Future features for the game loop 

The main mechanics which were developed for the project include:- 
- A 10 X 10 map grid with configurable settings for:
  - Active tile
  - Height of the tile
  - Obstacles

<img class="article-screenshot" src="/assets/projects/tactics1.png" alt=""/>

- The user can create levels manually or use a level generator by defining the settings of each tile in the map grid.

- Enemies with pathfinding on the grid. This involves creating a history of all the tiles with their neighbouring tiles. Based on the character and obstacle positions, the tiles can have the following states:-
  - Occupied (by another player character)
  - Blocked (by obstacle or enemy)
  - Unavailable (no tile present)
  - Free.

<img class="article-screenshot" src="/assets/projects/tactics2.png" alt=""/>

- Colored Tiles to display available tiles. The pathfinding algorithm would set the state of a tile as free or occupied and the color would be displayed as such.
- Turn-based Battle System based on a Speed parameter of all the characters in the Battle. All the characters are ranked based on the speed parameter and move accordingly.

<img class="article-screenshot" src="/assets/projects/tactics3.png" alt=""/>

- A Dynamic NavMesh which is created at runtime after level instantiation of the grid and before enemy placement. This is done as the level is instantiated at runtime.
