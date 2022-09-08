---
layout: project
title: "Roaming Ruins"
author: Siddhartha
permalink: /roaming-ruins/
type: "Self-project"
engine: "Unity"
language: "C#"
platform: "PC"
description: "A 3D dungeon-crawler/puzzle game made in 1 week for the Brackey's Game Jam 2020.02. This was a solo project and the time reversal mechanic, artwork was made from scratch."
image: "/assets/projects/roaming0.png"
---

A 3D dungeon-crawler/puzzle game made in the Unity Game engine. This game was made for the Brackey's Game Jam 2020.02, a 1 week game jam whose theme was "Rewind". You can find the project at the following links:-

- Build: <a href="https://kingcrimson1112.itch.io/roaming-ruins">Roaming Ruins</a>
- Source: <a href="https://github.com/sps1112/roaming-ruins">sps1112/roaming-ruins</a>

The goal of each level is to reach the portal at the end of each dungeon. The player has to find their way inside a dungeon, unlock rooms to find loot, fight enemies, and solve puzzles.

<img class="article-screenshot" src="/assets/projects/roaming0.png" alt=""/>

The main challenges of this project were:-
- Implementing a 3D Character Controller with a movable camera as our Main Character. The player moves based on the direction of the camera.
- Adding a Time Reversal mechanic. The Rigidbody’s position is recorded for the past few seconds at any instant. By holding a key, the player will retrace its position and orientation to give illusion of time reversal.
<div class="code-container">
<pre class="code-block">
// Recording Code
void Record()
{
    if (positionList.Count >= (int)((1 / Time.fixedDeltaTime) * timeLimit))
    {
        positionList.RemoveAt(positionList.Count - 1);
    }
    MotionData newData = new MotionData(transform.position, transform.rotation);
    positionList.Insert(0, newData);
}
</pre>
</div>

<div class="code-container">
<pre class="code-block">
// Rewinding Code
void Rewind()
{
      if (positionList.Count > 0)
      {
        ...
          MotionData newData = positionList[0];
          transform.position = newData.position;
          transform.rotation = newData.rotation;
          positionList.RemoveAt(0);
      }
      ...
}
</pre>
</div>

<img class="article-screenshot" src="/assets/projects/roaming1.png" alt=""/>

- Developing a standard key-lock form of dungeon which the player has to traverse.
  - There are blue gates which are linked to levers. By moving a lever, it will open 1 gate and close another.
  - There are yellow and red gates which require a yellow and red key to open respectively.
- Designing the dungeons which fully utilized the Time-Reversal mechanic involved setting up multiple ways to access the same dungeon to promote Player Freedom.
- Placing Movable Platforms, Treasure Chests, and various Loot throughout the dungeon to populate them and make it more lively.

<img class="article-screenshot" src="/assets/projects/roaming3.png" alt=""/>

- Creating standard Enemies with pathfinding and Traps in the dungeon. This would create a sense of urgency in the player while he tries to find their way through the dungeons.
- Including Projectile Spells as means to stall the enemy and provide some other ways to solve the enemy problem.

<img class="article-screenshot" src="/assets/projects/roaming2.png" alt=""/>

- Created all the art assets during the later days of the Game Jam. Also implemented a cel-shader in Shader Graph and an outline shader to create a stylistic art-style.