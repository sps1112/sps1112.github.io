---
layout: project
title: "DeepSeeVR"
date: "June, 2025"
author: Siddhartha
permalink: /deepsee-vr/
type: "Professional"
organization: "Indieverse Studio"
category: "Games"
role: "Game Programmer"
engine: "Unity"
language: "C#"
platform: "Quest 3"
description: "VR application for underwater exploration and marine life observation"
image: "/assets/projects/switch0.png"
---

\item Setup and test prototype for an underwater simulator game in VR using XR Interaction Toolkit targeted for the Meta Quest 3
\item Create Shader Graph shaders for water surface, bubble spawners, screen space effects for underwater distortion, tint, caustics via decal projection and post processing effects
\item Create a simple character controller rig in VR using VRIF Final IK as template and create a simple movement script for underwater swimming motion
\item Setup vertex shader for wavy plants underwater using 3d simplex noise as the base and vertex shader for fish movement effect
\item Create a Boids motion script for a school of fishes to simulate fish motion underwater with a combination for speed and direction normalization, position centering in the group and repulsion with nearby objects.
\item Design and implement exporter-importer system from Unity Terrain System terrain into custom terrain map to spawn the terrain and plants into the custom terrain made in Blender
\item Created Editor Windows and Editor Inspector UI for the terrain and spawner tools 
\item Create a custom Instanced LOD system to render the plants in the custom terrain and design all the LOD regions for the map with testing for the ideal spawn percentage for target frame rates in different parts of the map
\item Implement analytics via Unity Analytics
\item Create an radiation system for static objects and fishes via a glow overlay shader on the existing shader materials of an object
\item Integrate a scanner hand device into the player rig along with world space diegetic UI integrated into our radiation system through a scanning mechanic
\item Created audio manager with sound asset scriptable object for narration, effects, trigger sounds and theme music
\item Created a world space UI system for VR for the narration and the tutorial system
\item Created an 2 camera-system for the Environemt Camera and UI+Rig Camera as an overlay on the main camera
\item Setup a demo flow for the mechanics with a checkpoint, narration system and a tutorial system for the game mechanic and world
\item Extensive optimization for the poly count, camera, shader effects, post processing for a smooth 72 FPS which is the default for Meta Quest 3
\item Marketing for the demo on Reddit with 11K views and 93 percent upvote ratio and with migration of testers onto Discord
\item Provided content for the trailer with an extensive library of clips showcasing all the mechaincs, visuals and features of the game
\item Showcased this game demo in IDGC 2024 as part of the Indie 40 initiative along with other projects and recieved positive feedback on the immersive nature of the game and optimization for the large open environment
\item Demo uploaded to Meta Quest Store and Sidequest as an Early Access with a total downloads of over 10,000 with a 35 percent completion rate
\item Extensive bug fixes and patches for the game based on alpha testing and analytics data to improve the demo tutorial and flow of the demo
\item Auto recenter script for the XR interaction rig and VRIF Rig for a seamless experience between scene switching
\item Contributed to the detailed design flow for the full release of the game a 6 Milestone with the tasking for all the engineering tasks and requirements for each milestone with time planning
\item Created a 2D waypoint marker system into the UI Camera system for the checkpoint system of the game
\item Creating a frame rate independent system for recording the controller transform and input data to record and playback controller motion for tutorial of various mechanics
\item Redesign the in-game tutorial for the player movement mechanic removing a blocker in game completion based on analytics
\item Setup a new Game Manger system for division of the game into scenes divided into stages each with phases with transition between all the levels of the game scene
\item Created an async scene loading system for the transition between the game scenes to reduce lag while loading a scene
\item Integrate a subtitle system into the narration system for seamless dialogues by the narrator in the game scenes
\item Design the game flow and setup and integrate various sections of the game such as the Broken Pod Sequence, Broken Scout Sequence and Hiding in Crater Sequence
\item Create a Cell and Recharge System for the Hand Device and its operations such as the scanning mechanic
\item Researched and prototyped ideas for a mechanical puzzle for the later sections of the game as a phyiscal and 2d puzzles
\item Created system for a randomly generated sliding blocks puzzle integrated into a gate opening sequence using our custom grabbable system and its end-to-end integration into the scene
\item Created a preset systems for the graphical settings and all the visual effects to quickly test out different visual styles for sections of the game
\item Implemented bug fixes and improvements to all the different sections of the game post internal testing involving visual bugs and logic errors in the UI, tutorials, narration, visual artefacts, asset changes and improvements,
\item Analyze and optimize the scout AI to be more aggresive in its chasing and attack behaviour
\item Implement the respawn mechanic into the scout attack system and other damage interactions and test it with the GameManager flow
\item Implement a rapid fire laser attack as the default behaviour for the scouts and setup the scout patrol paths for the chase scene in the crater
\item Merging and integration of various tasks along with testing for the updated narration, analytics and new features such as hand physics, shark AI, new environments, etc.
