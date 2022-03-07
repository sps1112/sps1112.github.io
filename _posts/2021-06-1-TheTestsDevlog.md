---
layout: article
title: "The Tests: Devlog"
time: "Aug, 2020"
author: Siddhartha
permalink: /thetests-devlog/
description: "Devlog for the game, \"The Tests\" developed for Fall Game Jam 2020"
image: "/assets/projects/tests1.png"
---
# Contents
- [Concept](#concept)
- [Gameplay](#gameplay)
- [Finishing](#finishing)
- [Conclusion](#conclusion)

## Concept

The first idea that I had regarding my game was to make a 2D game since most of my previous games have been in 3D. So I set out to make a platformer game with some ideas taken out of Metroid and The Legend of Zelda. The idea was a puzzle platformer where you traverse through a level with a basic key-lock structure as found in the Zelda games. Also since this was for a game-jam, I restricted the player's abilities to only jumping and dashing.

<img class="article-screenshot" src="https://img.itch.zone/aW1nLzQxNDY4OTcucG5n/original/va0S4i.png" alt="concept"/>

## Gameplay

The first task was to create a test level and test out the character controller with a smooth camera. In my earlier projects I used Unity’s Cinemachine for the camera, but this time I tried writing my own custom script. The camera follows the player with some offset, that is, lags behind while moving, enhancing the perception of motion. It also remains clamped inside the bounds of the rooms depending on the size and aspect ratio of the camera.

I then worked on transitions between rooms, basic patrolling enemies and modifying the dash to be able to kill enemies and open gates.

<img class="article-screenshot" src="https://img.itch.zone/aW1hZ2UvNzQzOTI1LzQxNDY5NDMucG5n/794x1000/J4HLb7.png" alt="transitions"/>

The room transitions were the first problem that I ran into. By changing rooms the camera would stop following the player, change its bounds according to the new room, and then start following the player again. This transition initially led to jittery motion and wrong room bounds but was resolved after some debugging.

The next part was to create a prototype with UI, menus, keys, gates and a whole level. The prototype was for testing the jump height and fall time, the dash effect, recoil on damage and hits, speed of the room transitions, setting the enemies in the rooms active or inactive based on the current room and some standard UI for health and keys.

## Finishing

With two days spent on prototyping, I had to scrap the idea of creating original sprites and stuck with the primitive shapes. To enhance the look of my game, I added some post-processing effects like particles, trails, a nordic font and screen shake to the prototype.

<img class="article-screenshot" src="https://img.itch.zone/aW1hZ2UvNzQzOTI1LzQxNDY5NDUucG5n/794x1000/CTF6Qz.png" alt="particles"/>


With time running out, I set out to create a small tutorial and the goal of three more levels. The transitions between levels involved the use of long corridors and one way paths such that the player would not realise that they had switched between levels. 

<img class="article-screenshot" src="https://img.itch.zone/aW1hZ2UvNzQzOTI1LzQxNDY5NDIucG5n/794x1000/LWypHO.png" alt="tutorial"/>

These level transitions required a static class to hold player attributes such as health, position, velocity, current room bounds, camera position and a list of all keys held. These values also had to be reset if the player quit to the main menu.
By the time I got to the end of the second level, I was running out of patterns to put in the third level. Thus I decided to scrap that idea and finished the game with the tutorial and two levels. This lack of time is also why the game has no music.

## Conclusion

<img class="article-screenshot" src="https://img.itch.zone/aW1hZ2UvNzQzOTI1LzQxNDY5NDgucG5n/794x1000/01Z60Q.png" alt="dead"/>

This project turned out a lot different than the initial idea. I was unable to create custom sprites for the player, enemies, gates, platforms and stuck custom shapes for the project. The idea for a custom tileset with background was also discarded along with sound effects. The finished project may not be what I had hoped for but I was still happy with what I was able to achieve in this period of time. Creating “The Tests” was a great exercise, and I had a lot of fun participating in the jam. I would be looking forward to participating in future game-jams.
