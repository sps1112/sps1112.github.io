---
layout: project
title: "Shader Library"
author: Siddhartha
permalink: /shader-library/
type: "Self-project"
engine: "ShaderToy"
language: "GLSL"
platform: "PC"
description: "A collection of pixel shaders written on the ShaderToy platform. Utilizing perlin, fractal, voronoi noise to generate complex shaders."
image: "/assets/projects/shader0.png"
---

Itch:  https://kingcrimson1112.itch.io/the-tests.

Github: https://github.com/sps1112/The-Tests.

A Platformer/Metroidvania made in Unity as part of a 3-day Game Jam. This Game Jam had no theme and I made this to test out my skills making a 2D game. 

<img class="article-screenshot" src="/assets/projects/shader0.png" alt=""/>

The main features were implemented as:-
- A 2D Rigidbody character controller with a Camera following it. Extensive work was put in to tweak the Player to provide a smooth movement.

<img class="article-screenshot" src="/assets/projects/shader1.png" alt=""/>

- A Smooth camera which lerps to the player position but is bound to the confines of the current room. All of this was done via Code without using third-party Plugins.

<img class="article-screenshot" src="/assets/projects/shader2.png" alt=""/>

- A Modular Room system where enemies are allotted a room in the world environment and they are reset/turned off based on the room the player is in. This was done mainly to save processing power.

<img class="article-screenshot" src="/assets/projects/shader3.png" alt=""/>

- A Simple Dash functions as an alternate form of movement and also a mode of interaction with the world. The Dash would also be used to open doors and thus act as a versatile action available to the player.

<img class="article-screenshot" src="/assets/projects/shader4.png" alt=""/>

I have further broken down the development process in this blog that I wrote after said Game Jam at https://gds.sntiitk.in/2020/09/20/fall-game-jam.html 
