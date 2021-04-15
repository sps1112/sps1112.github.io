# Project Portfolio
#### By Siddhartha Pratap Singh(sidps@iitk.ac.in) 

A collection of self-projects in the field of Game Development.

## Roaming Ruins
A 3D dungeon-crawler/puzzle game made in 1 week as part of Brackey’s Game Jam 2020.02. 

It is currently hosted at https://kingcrimson1112.itch.io/roaming-ruins. This is a solo project with all the art done during the 1 week period.

The main features implemented in the project are:-
- A 3d character controller with the ability to go back in time.
- A standard key-lock form of dungeon which the player has to traverse.
- Standard Enemies with path finding and Traps in the dungeon.
- Movable Platforms, Treasure Chests and Loot.
- Projectile Spells.

## The Tests
A platformer/metroidvania made in Unity as part of a 3 day Game Jam. It is currently hosted at https://kingcrimson1112.itch.io/the-tests. 

Features implemented in the game:-
- Standard Platformer character controller
- A smooth camera
- A room system where enemies are allotted a room in the world environment and the enemies are reset/turned off based on the room the player is in.
- Simple Dash which functions as an alternate form of movement and also a mode of interaction with the world.

I have further broken down the development process in this blog that i wrote in the aftermath of said Game Jam at https://gds.sntiitk.in/2020/09/20/fall-game-jam.html 

## Renderer, OpenGL
A basic OpenGL Renderer written in C++. Currently it is hosted on Github at https://github.com/sps1112/opengl-project . 

The work done on the renderer includes:-
- A basic primitive system to easily render primitives like Cube and Rects.
- Blinn-Phong Shading with Gamma Correction implemented.
- A movable Camera system with Orthographic and Perspective Camera with easily configurable properties.
- Model Loading with Assimp.
- A Shader and Light Class to set up multiple lights in a Scene.
- GUI with ImGui to debug the scene and alter the properties of Scene Objects and Renderer.
- FrameBuffer Rendering to implement post-processing effects.


Libraries used include GLFW, Assimp, ImGui.

Current work is being done to implement a Scene System with UI to easily create new Scenes and populate them with Objects. 


## FPS: Arena
This is a self-project wherein I implemented a level-based FPS game where the player has to survive waves of zombie enemies. The game includes:-
- Adventure mode with 10 defined levels with a set number of enemy waves.
- Survival Mode with 3 levels and unlimited waves.
- A shop to upgrade/buy weapons, upgrade player and upgrade power-ups
- Saving game data to a file to save progress/player data.

## Tactics:RPG
An Isometric Tactics RPG as seen in games like Final Fantasy Tactics. It includes 
- A configurable 10X10 grid with settings for height of each tile, empty tile, obstacles, etc.
- Enemies with pathfinding on the grid.
- A UI to show all the valid points of movement.
- Turn-based Battle System with a Speed parameter.

## Generic: JRPG
A template implementation of the JRPG genre with:-
- A well-defined party based battle system
- Multiple Enemy types
- Possible Actions such as:-
  - Attack
  - Spell
  - Item
- An overworld with roaming enemies.

## Procedural Map Generation
A Procedural Map Generator based on Pernil Noise. The project was made in Unity using C# and is not-hosted anywhere.
Features implemented in the project:-
- Develop a 2d height-map to a texture from configurable Perlin-Noise settings
- Generate a Color-map from the height map and apply to a plane.
- Generate Mesh from Color-map to draw 3D mesh of the map
- Apply fall-off to create enclosed maps.
- Infinite world generation using LODs and terrain-chunk generation
