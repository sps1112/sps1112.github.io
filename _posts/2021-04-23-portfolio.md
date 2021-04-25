---
layout: post
title:  "Portfolio!"
categories: /portfolio/
permalink: /portfolio/
---

# **Project Portfolio**
### By *Siddhartha Pratap Singh*(sidps@iitk.ac.in) 


Here, I have compiled a list of some of my prominent Projects concerning Game Development and Graphics Programming. All the available can be accessed in the project description.

## Roaming Ruins

Itch: https://kingcrimson1112.itch.io/roaming-ruins

A 3D dungeon-crawler/puzzle game made in 1 week as part of Brackey’s Game Jam 2020.02. This is a solo project with all the artwork done during the 1 week period.

The main challenges of this project were:-
- Implementing a 3D Character Controller with Movable Camera as our Main Character.
- Adding a Time Reversal mechanic by storing the Rigidbody’s position for the past few seconds at any instant. (Main Theme of the Game Jam was “Reverse”)
- Developing a standard key-lock form of dungeon which the player has to traverse. This involved designing Dungeons which fully utilized the Time Reversal Mechanic. This would also involve setting up multiple ways to access the same dungeon to promote Player Freedom.
- Creating standard Enemies with pathfinding and Traps in the dungeon. This would create a sense of urgency in the player while he tries to find their way through the dungeons.
- Placing Movable Platforms, Treasure Chests, and various Loot throughout the dungeon to populate them and make it more lively.
- Including Projectile Spells as means to stall the enemy and provide some other ways to solve the enemy problem.

## The Tests
Itch:  https://kingcrimson1112.itch.io/the-tests.

Github: https://github.com/sps1112/The-Tests.

A Platformer/Metroidvania made in Unity as part of a 3-day Game Jam. This Game Jam had no theme and I made this to test out my skills making a 2D game. 

The main features were implemented as:-
- A 2D Rigidbody character controller with a Camera following it. Extensive work was put in to tweak the Player to provide a smooth movement.
- A Smooth camera which lerps to the player position but is bound to the confines of the current room. All of this was done via Code without using third-party Plugins.
- A Modular Room system where enemies are allotted a room in the world environment and they are reset/turned off based on the room the player is in. This was done mainly to save processing power.
- A Simple Dash functions as an alternate form of movement and also a mode of interaction with the world. The Dash would also be used to open doors and thus act as a versatile action available to the player.

I have further broken down the development process in this blog that I wrote after said Game Jam at https://gds.sntiitk.in/2020/09/20/fall-game-jam.html 

## Renderer, OpenGL
A basic OpenGL Renderer written in C++. Currently, it is hosted on Github at https://github.com/sps1112/opengl-project. 

The work done on the renderer includes:-
- A basic primitive system to easily render primitives like Cube and Rects. The file reader is custom and the custom file extensions similar to .obj format.
- Blinn-Phong Shading with Gamma Correction implemented. Updated from previous Phong Shading. The Renderer is set up to later include PBR.
- A movable Camera system with Orthographic and Perspective cameras with easily configurable properties.
* Integrating ASSIMP to help with loading pre-made 3D Assets. Also tweak the integration to Render Blender Scenes exported as .obj files. 
- A Shader and Light Class to set up multiple lights in a Scene. The lights are all dynamic with easily accessible properties. This helps in easily debugging lighting effects in shaders.
- GUI with ImGui to debug the scene and alter the properties of Scene Objects and Renderer. The GUI is abstracted to instantiate multiple windows with configurable properties.
- Rendering to a Framebuffer. This helps in implementing post-processing effects to the final render.

Third-Party libraries that are used in the project include GLFW, GLM, Assimp, ImGui.

The current plan for the renderer is to:- 
- Implement a Scene System with UI to easily create new Scenes 
- Add Objects to that scene in the form of 2D objects, 3D objects, Camera and Lights.
- Edit Predefined properties of said objects such as color and World Position.

These would help the user in creating their own scenes and easily debug effect on pre-defined template scenes.

## Tactics: RPG
An Isometric Tactics RPG as seen in games like Final Fantasy Tactics. This project is currently not hosted anywhere. 

The main features that were implemented as part of this were:- 
- A configurable 10X10 grid with settings for the height of each tile, empty tile, obstacles, etc. The user can create levels manually or by a level generator by defining the settings of each tile in the grid.
- Enemies with pathfinding on the grid. This involves creating a history of all the tiles with their neighbouring tiles, The tiles also have occupied, blocked, unavailable and free states based on obstacle and character placement,
- Colored Tiles to display available tiles. The pathfinding algorithm would set the state of a tile as free or occupied and the color would be displayed as such.
- Turn-based Battle System based on a Speed parameter of all the characters in the Battle. All the characters make their move based on their speed value.
- A Dynamic NavMesh which is created at runtime after level instantiation of the grid and before enemy placement. This is done as the level is instantiated at runtime.

## Generic: JRPG
Template implementation of the JRPG genre with:-
- A standard JRPG battle system.This includes turn-based combats between 2 party of the player and the enemy.  
- Multiple Enemy types. The data for enemies is stored in the form of Assets.
- Possible Actions available to the player such as:-
  - Attack
  - Spell
  - Item
  - Flee
- Scriptable Objects for Player Party Members, Items, Spells, Enemies, etc.
- An overworld with roaming enemies. The battle would be initiated when the player sprite comes in contact with the enemy sprite.

## Procedural Map Generation
A Procedural Map Generator based on Perlin-Noise. The project was made in Unity using C# and is not hosted anywhere.

Features implemented in the project:-
- Develop a 2d heightmap to a texture from configurable Perlin-Noise settings. This involved setting up a Perlin-Noise Generator which produces a 2d array. The array would be translated into a texture created at runtime which could be attached to a material.
- Generate a Color-map from the height map and apply it to a plane. The heightmap from before is converted to a Color-Map by defining a Struct of a Height Range and Color. The values from the heightmap are matched to the Color Range struct to get the color value and create Color-map texture. 
- Generate Mesh from Color-map to draw 3D mesh of the map. The height value from the height map and UV position of a pixel would be converted into 3D points as (UVx, UVy, H). These 3D points stored into an array are used to create the Vertices of a 3D Mesh, UV of for textures of said mesh and triangles needed for Rendering. This mesh is created at runtime and is assigned the color-map as a texture.
- Apply fall-off to create enclosed maps. By subtracting some falloff-factor and clamping the values along the edges of the heightmap we obtain a closed texture which can be used to generate a closed map as such.
- Also implemented features such as LODs to optimize CPU performance.