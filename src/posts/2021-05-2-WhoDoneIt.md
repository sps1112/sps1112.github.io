---
layout: project
title: "Who Done It?"
author: Siddhartha
permalink: /who-done-it/
type: "GameDev Society, IITK"
role: "Game Programmer and Designer"
engine: "Unity"
language: "C#"
platform: "PC"
description: "Mystery detective game made in Unity for the BYOG Game Jam 2021. Oversaw the remote production of the game, developed the dynamic camera system, input manager and designed the narrative beats."
image: "/assets/projects/who-done0.jpg"
---

A mystery-detective game made in a 9-member team as part of Studio Centauri, the game development society of IIT Kanpur. The game was developed for BYOG Game Jam 2021, a 3-day game jam organized by Gamedev.in, a community of Indian game developers. The theme of the game jam that we used was "2 views".

- Build: <a href="https://studiocentauri.itch.io/who-done-it">Who Done It?</a>
- Source: <a href="https://github.com/studiocentauri/byog21-gamedev">studiocentauri/byog21-gamedev</a>

Who Done It? is a detective game where you dig into a murder case with differing points of view. There are 2 major witnesses to the murder, both of whom tell a different story. You have to look for clues, listen to witness testimonies for said clues, and piece-together what truly happened that fateful night!

<img class="article-screenshot" src="/assets/projects/who-done0.jpg" alt=""/>

Work done as part of the development process included:
- Design of the murder event, clues, witnesses, testimonies, and the methods of interacting with the crime scene.
- The input manager allows player movement by clicking on the game map. Player AI moves with the help of Unity's NavMesh system and traverses the scene. Click on a witness to initiate dialogue, and click on a clue to inspect it.

<img class="article-screenshot" src="/assets/projects/who-done3.png" alt=""/>

<div class="code-container">
<pre class="code-block">
// ClickManager.cs
void Update()
{
    if (Input.GetMouseButtonDown(0) && canClick)
    {
        Ray mRay = Camera.main.ScreenPointToRay(Input.mousePosition);
        RaycastHit hit;
        if (Physics.Raycast(mRay, out hit, maxDistance, layerMask))
        {
            Debug.Log(hit.collider.gameObject.name + "  " + hit.point);
            if (hit.collider.gameObject.tag == "Ground")
            {
                player.GetComponent&lt;PlayerMovement&gt;().MovePlayer(hit.point);
            }
            else if (hit.collider.gameObject.tag == "Witness")
            {
                player.GetComponent&lt;PlayerMovement&gt;().MoveToTarget(hit.point);
                canClick = false;
                dialogueNPC = hit.collider.gameObject;
            }
            else if (hit.collider.gameObject.tag == "clue")
            {
                canClick = false;
                clueObject = hit.collider.transform.gameObject;
                Vector3 point = hit.point;
                point.y = 0;
                player.GetComponent&lt;PlayerMovement&gt;().MoveToTarget(point, true);
            }
        }
    }
}
</pre>
</div>

- The camera system for the dialogue window and the clue inspection window. The camera view shifts when the player accesses the witness's testimony to look at the witness. Dynamically change the camera rect for the dialogue window to focus more on the conversation and show the characters.

<img class="article-screenshot" src="/assets/projects/who-done1.png" alt=""/>

<div class="code-container">
<pre class="code-block">
// CameraMovement.cs
void FollowTarget()
{
    Vector3 direction = lookObject.transform.position - player.transform.position;
    direction.Normalize();
    Vector3 desiredForward = Vector3.Lerp(transform.forward, direction, moveFactor);

    Vector3 up = Vector3.up;
    Vector3 forward = desiredForward;
    Vector3 right = Vector3.Cross(up, forward);
    up = Vector3.Cross(forward, right);

    Vector3 desiredPos = player.transform.position +
        forward * dialogueOffset.z + up * dialogueOffset.y + right * dialogueOffset.x;

    transform.position = Vector3.Lerp(transform.position, desiredPos, moveFactor / 2.0f);
    transform.forward = Vector3.Lerp(transform.forward, 
                        (lookObject.transform.position - transform.position).normalized, moveFactor);
}

void SetupAR()
{
    Vector2 currentRes = new Vector2(Screen.width, Screen.height);
    Vector2 targetRes = currentRes;
    if ((dialogueAR.x / dialogueAR.y) > (currentRes.x / currentRes.y))
    {
        targetRes.y = (targetRes.x / dialogueAR.x) * dialogueAR.y;
    }
    else
    {
        targetRes.x = (targetRes.y / dialogueAR.y) * dialogueAR.x;
    }

    Vector2 offset = ((currentRes - targetRes) / currentRes) / 2.0f;
    offset = Vector2.Lerp(new Vector2(Camera.main.rect.x, Camera.main.rect.y), offset, moveFactor);

    targetRes /= currentRes;
    targetRes = Vector2.Lerp(new Vector2(Camera.main.rect.width, Camera.main.rect.height), 
                            targetRes, moveFactor);

    Camera.main.rect = new Rect(offset.x, offset.y, targetRes.x, targetRes.y);
}
</pre>
</div>

- After dialogue with a witness, their corresponding event will be added to the Events UI. The player will be able to access events based on the event and try to formulate a chain of events that took place. By choosing the correct events, the player will complete the game.

<img class="article-screenshot" src="/assets/projects/who-done2.png" alt=""/>
