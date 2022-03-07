---
layout: article
title: "Motion in Games"
time: "March, 2021"
author: Siddhartha
permalink: /motion-games/
description: "Article showcasing various methods of implementing motion in games"
image: "/assets/projects/motion.png"
---
# Contents
- [Overview](#overview)
- [Transform Manipulation](#transform-manipulation)
- [Rigidbody Manipulation](#rigidbody-manipulation)
  - [The Velocity Approach](#the-velocity-approach)
  - [The Force Approach](#the-force-approach)
- [Bonus Content: Frame vs Physics Frame](#bonus-content-frame-vs-physics-frame)
  - [DeltaTime vs FixedDeltaTime](#deltatime-vs-fixeddeltatime)
- [References](#references)

One of the ways you can influence the objects in a game is by moving them. This is usually done in scripts attached to objects. Movement is seen throughout games such as a moving player character, fired bullets from a gun, etc. We've seen a few examples of movement already, but let's dive into some details.
   
## Overview 

We usually use one of the following two approaches to move an object
1. By changing *position* (`Transform` manipulation)
2. By adding *force* or changing *velocity* (`Rigidbody` Manipulation)

The following examples are based on `Unity`. Implementation in other engines is more or less the same and follows the same priniciples.

## Transform Manipulation

Movement of an object by using its `Transform` involves directly changing the position of the object. The position can be changed in code in response to events like the push of a button. Consider the following examples

- Changing the position by some vector each time `Space` is pressed

<div class="code-container">
<pre class="code-block">
void Update() 
{
    // Check if Space button is Just Pressed down
    if(Input.GetKeyDown(KeyCode.Space)) 
    {
        // transform.position is a Vector3 and gives the object's position
        transform.position += Vector3(0, 0, 10);
    }
}
</pre>
</div>

- Changing the position when `Space` is held

<div class="code-container">
<pre class="code-block">
// Constants
float velocity = 5.0f;
Vector3 moveDirection = Vector3(0, 0, 10);

void Update() 
{
    // Checks if the space button is held down
    if(Input.GetKey(KeyCode.Space)) 
    {
        transform.position += moveDirection * veclocity;
    }
}
</pre>
</div>

- Constantly changing the position

<div class="code-container">
<pre class="code-block">
float velocity = 5.0f;
Vector3 moveDirection = Vector3(0,0,10);

void Update() 
{
    // Statement is not inside any if statement so this is executed every frame
    transform.position += moveDirection * veclocity;
}
</pre>
</div>

**Note:** Movement by manipulation of the `Transform` component is done in cases where collisions are not enabled. For example, objects revolving around other objects.

## Rigidbody Manipulation

We could also leverage the physics system to make our objects move. This involves either applying a new force or changing the object's velocity.

### The Velocity Approach

This is done in cases such as player movement and moving vehicles. We can manually change the velocity of an object a tiny bit per 
frame to apply some *acceleration*.

<div class="code-container">
<pre class="code-block">
// See the bonus content for the difference between Update and FixedUpdate
void FixedUpdate()
{
    Vector3 acceleration = Vector3(0, 0, 1);
    if(Input.GetKey(KeyCode.W)) 
    {
        rigidbody.velocity += acceleration;
    }
}
</pre>
</div>

There's a slight problem here though. The `Update()` is called each frame, and therefore, the acceleration applied is actually 1 m/s/frame, and not 1 m/s<sup>2</sup> like we'd expect. At this point we need to establish what units we'll use. It's much more convenient to use SI units everywhere, considering that calculating change-per-frame is as easy as

Change per frame = Acceleration in m/s<sup>2</sup> * Time duration of the frame in seconds

Most game engines will provide a `deltaTime` variable to track the time duration of the last frame, which we can use as an approximation to the duration of the current frame. The fixed code in SI units therefore looks like this

<div class="code-container">
<pre class="code-block">
rigidbody.velocity += acceleration * Time.deltaTime; // acceleration can be defined in SI units now
</pre>
</div>

There is a slightly more subtle problem here than just the units, which is described in the bonus content below.

### The Force Approach

This is done in cases such as jumping or firing projectiles. We apply an impulse and let the physics system handle the rest.

- Adding force when `Space` is pressed

<div class="code-container">
<pre class="code-block">
Vector3 forceVector = Vector3(0, 1, 0);
void FixedUpdate() 
{
    if(Input.GetKey(KeyCode.Space)) 
    {
        // Applies impulsive force given by the first argument
       rigidbody.AddForce(forceVector, ForceMode.Impulse);
    }
}
</pre>
</div>

- Add gravitation force constantly

<div class="code-container">
<pre class="code-block">
void FixedUpdate() 
{
    // Applies acceleration force
    rigidbody.AddForce(Vector3(0, -9.81, 0), ForceMode.Acceleration);
}
</pre>
</div>

**Note:** Movement by manipulation of `Rigidbody` component is done in cases where collisions or physics are needed. For example, a player jump.

## Bonus Content: Frame vs Physics Frame

Game Engines have a concept of game loops which might have different implementations. Unity is one such engine. In the above cases of `Transform` and `Rigidbody` manipulation we 
used 2 different functions

- `FixedUpdate` is for the loop that handles physics calculations. The duration of a frame here is *fixed*. For example, this function is guaranteed to be called 60 times per second
- `Update` is for loops that handle everything else, like common game logic, AI etc. Duration of a frame is *not fixed* and may fluctuate.

Does that mean the `deltaTime` variable has a different meaning based on the context? Let's see.

### DeltaTime vs FixedDeltaTime

In these examples the change in position and velocity happens every `Update` or `FixedUpdate` call. Thus the change is frame 
dependent. One example may be of changing position of a player.

<div class="code-container">
<pre class="code-block">
float moveSpeed = 5.0f;
void Update() 
{
    // GetMoveDirection returns a unit vector in the direction to move in based on some inputs
    Vector3 moveDir = GetMoveDirection();
    transform.position += moveDir * moveSpeed;
}

// OR

float acceleration = 2.5f;
void FixedUpdate() 
{
    Vector3 moveDir = GetMoveDirection();
    rigidbody.velocity =+ moveDir * acceleration;
}
</pre>
</div>

These frame calls depend on the hardware of the user: different frame rates will lead to different behaviour for different users. For a uniform behaviour, we need to make these changes time dependent. This is where `deltaTime` is used.

- `deltaTime` is the time gap between successive `Update` calls.
- `fixedDeltaTime` is the time gap between successive `FixedUpdate` calls.

We can multiply these changes by `deltaTime` and `fixedDeltaTime` to make the changes dependent on the time gap between function calls leading to a uniform experience.

<div class="code-container">
<pre class="code-block">
// Update()
transform.position += moveDir * moveSpeed * Time.deltaTime; // multiply deltaTime

// OR FixedUpdate()
velocity += moveDir * acceleration * Time.fixedDeltaTime; // multiply fixedDeltaTime
</pre>
</div>

The above examples are the most general forms of movement you can see in a game.

## References
1. [Transform.position - Unity Documentation](https://docs.unity3d.com/ScriptReference/Transform-position.html)
2. [Rigidbody.velocity - Unity Documentation](https://docs.unity3d.com/ScriptReference/Rigidbody-velocity.html)
3. [Rigidbody.AddForce - Unity Documentation](https://docs.unity3d.com/ScriptReference/Rigidbody.AddForce.html)
4. [ForceMode - Unity Documentation](https://docs.unity3d.com/ScriptReference/ForceMode.html)
5. [Update - Unity Documentation](https://docs.unity3d.com/ScriptReference/MonoBehaviour.Update.html)
6. [FixedUpdate - Unity Documentation](https://docs.unity3d.com/ScriptReference/MonoBehaviour.FixedUpdate.html)
7. [Time.deltaTime - Unity Documentation](https://docs.unity3d.com/ScriptReference/Time-deltaTime.html)
8. [Time.fixedDeltaTime - Unity Documentation](https://docs.unity3d.com/ScriptReference/Time-fixedDeltaTime.html)
