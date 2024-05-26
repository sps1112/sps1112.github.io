---
layout: project
title: "Roaming Ruins"
author: Siddhartha
permalink: /roaming-ruins/
type: "Self-project"
engine: "Unity"
language: "C#"
platform: "PC"
description: "Dungeon-crawler game made in 1 week for the Brackey's Game Jam 2020.02. This was a solo project with the various components such as time reversal mechanic, dungeon design and low poly artwork being made from scratch."
image: "/assets/projects/roaming0.png"
---

Roaming Ruins is a 3D dungeon-crawler game made in the Unity Game engine. This game was made for the Brackey's Game Jam 2020.02, a 1 week game jam whose theme was "Rewind". You can find the project at the following links:-

- Build: <a href="https://kingcrimson1112.itch.io/roaming-ruins">Roaming Ruins</a>
- Source: <a href="https://github.com/sps1112/roaming-ruins">sps1112/roaming-ruins</a>

The goal is devided into various levels in form of small dungeons. A standard dungeon is made up of square rooms connected via pathways to other rooms. The goal of each level is to find the portal at the end of each dungeon and leading them to the next. The game involves the player finding their way through the dungeon, unlocking rooms, finding loot, fighting enemies and solving puzzles.

<img class="article-screenshot" src="/assets/projects/roaming0.png" alt=""/>

The major components of the game where work was done includes:-
- Implementing a 3D Character Controller with a movable camera as our Main Character. The player moves based on the direction of the camera.
- Adding a Time Reversal mechanic. The Rigidbody’s position is recorded for the past few seconds at any instant. By holding a key, the player will retrace its position and orientation to give illusion of time reversal.
<div class="code-container">
<pre class="code-block">
// RewindMotion.cs
void Record()
{
    if (positionList.Count >= (int)((1 / Time.fixedDeltaTime) * timeLimit))
    {
        positionList.RemoveAt(positionList.Count - 1);
    }
    MotionData newData = new MotionData(transform.position, transform.rotation);
    positionList.Insert(0, newData);
}

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
