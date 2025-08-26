---
layout: project
title: "Beyblade Simulator"
date: "June, 2024"
author: Siddhartha
permalink: /beyblade-simulator/
type: "Personal"
category: "Graphics"
engine: "Unity"
language: "C#"
platform: "PC"
description: "Beyblade battle simulator game made in Unity. Features physics-based battles, customizable beyblades, and arena environments."
image: "/assets/projects/tactics0.png"
---
\item Setup a 3d renderer using three.js as the rendering api along with camera and render loop and gui using lil-gui creating multiple widgets for the objects, lights, camera and scene
\item Add geometry class for primitive meshes, text mesh and 3d models and materials for simple color, texture, normal, matcap, toon and pbr
\item Setup object setup classes for the camera with pitch-yaw motion, light sources and mesh class using a geometry and material with scene class as a collection of meshes and lights
\item Integrate Rapier3D as the physics engine and setup classes to generate static and dynamic rigibodies and setup colliders for various primitive meshes with render collider debug option
\item Setup utility functions for Keyboard and Mouse input, debug helper widgets for lights and async importers for font assets, textures, cubemaps and .glb 3d model assets
