---
layout: project
title: "The Tests"
author: Siddhartha
permalink: /the-tests/
type: "Self-project"
engine: "Unity"
language: "C#"
platform: "PC"
description: "A platformer-metroidvania game made in Unity as part of a 3-day Game Jam. Developed the character controller, camera system, room manager during the period of the jam."
image: "/assets/projects/tests0.png"
---

A Platformer/Metroidvania made in Unity as part of a 3-day Game Jam. Inspired by games such as Super Metriod and Hollow Knight. 

- Build: <a href="https://kingcrimson1112.itch.io/the-tests">The Tests</a>
- Source: <a href="https://github.com/sps1112/The-Tests">sps1112/The-Tests</a>

The game is made up of a tutorial level and 2 other levels. The player has to reach the end of each level to reach the next one. The player will encounter locked gates and enemy. The player can dash to attack the enemies and open gates. Some gates requires keys to open.

<img class="article-screenshot" src="/assets/projects/tests0.png" alt=""/>

The main features were implemented as:-
- A 2D Rigidbody character controller with a Camera following it. Extensive work was put in to tweak the Player to provide a smooth movement.
- A Smooth camera which lerps to the player position but is bound to the confines of the current room. All of this was done via Code without using third-party Plugins.

<div class="code-container">
<pre class="code-block">
// Smooth Camera
...
Vector3 smoothPosition = Vector3.Lerp(transform.position, targetPOS, smoothFactor);
smoothPosition.x = Mathf.Clamp(smoothPosition.x, bounds[0].x, bounds[1].x);
smoothPosition.y = Mathf.Clamp(smoothPosition.y, bounds[0].y, bounds[1].y);
transform.position = smoothPosition;
...
</pre>
</div>

<img class="article-screenshot" src="/assets/projects/tests1.png" alt=""/>

- A Modular Room system where enemies are allotted a room in the world environment and they are reset/turned off based on the room the player is in. This was done mainly to save processing power.

<img class="article-screenshot" src="/assets/projects/tests2.png" alt=""/>

- A Simple Dash functions as an alternate form of movement and also a mode of interaction with the world. The Dash would also be used to open doors and thus act as a versatile action available to the player.

<div class="code-container">
<pre class="code-block">
// Opening gates using Player Dash

void OnTriggerStay2D(Collider2D other)
{
    if (other.gameObject.tag == "Player")
    {
        // Check if player is dashing
        if (other.gameObject.controller.GetStatus())
        {
            if (sprite.activeSelf)
            {
                if (gateType == KeyGateType.Normal)
                {
                    sprite.SetActive(false);
                }
                else
                {
                    Debug.Log("not normal gate");
                    if (CheckKey())
                    {
                        GameObject.Find("GameManager").keymanager.UseKey(gateType);
                        sprite.SetActive(false);
                    }
                }
            }
        }
    }
}
</pre>
</div>

<img class="article-screenshot" src="/assets/projects/tests3.png" alt=""/>

- Enemies which patrol in rooms in an oscillating fashion. If the player gets in contact with the enemies, they will take some damage. The player can damage the enemies by using the Dash.

<img class="article-screenshot" src="/assets/projects/tests5.png" alt=""/>

I have further broken down the development process in this blog that I wrote after said Game Jam at <a href="https://gds.sntiitk.in/2020/09/20/fall-game-jam.html">Fall Game Jam</a> or [The Tests: Devlog](/thetests-devlog/)

<img class="article-screenshot" src="/assets/projects/tests4.png" alt=""/>
