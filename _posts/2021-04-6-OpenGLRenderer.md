---
layout: project
title: "OpenGL Renderer"
author: Siddhartha
permalink: /opengl-renderer/
type: "Self-project"
engine: "OpenGL API, GLFW"
language: "C++"
platform: "PC"
description: "A basic OpenGL Renderer written in C++. Includes Renderer, Shader, Material and Model classes."
image: "/assets/projects/renderer1.png"
---

A basic OpenGL Renderer written in C++. Currently, it is hosted on Github at https://github.com/sps1112/opengl-project. 

<img class="article-screenshot" src="/assets/projects/renderer0.png" alt=""/>

The work done on the renderer includes:-
- A basic primitive system to easily render primitives like Cube and Rects. The file reader is custom and the custom file extensions similar to .obj format.
- Blinn-Phong Shading with Gamma Correction implemented. Updated from previous Phong Shading. The Renderer is set up to later include PBR.
- A movable Camera system with Orthographic and Perspective cameras with easily configurable properties.
* Integrating ASSIMP to help with loading pre-made 3D Assets. Also tweak the integration to Render Blender Scenes exported as .obj files. 
- A Shader and Light Class to set up multiple lights in a Scene. The lights are all dynamic with easily accessible properties. This helps in easily debugging lighting effects in shaders.
- GUI with ImGui to debug the scene and alter the properties of Scene Objects and Renderer. The GUI is abstracted to instantiate multiple windows with configurable properties.
- Rendering to a Framebuffer. This helps in implementing post-processing effects to the final render.

<img class="article-screenshot" src="/assets/projects/renderer1.png" alt=""/>

Third-Party libraries that are used in the project include GLFW, GLM, Assimp, ImGui.

The current plan for the renderer is to:- 
- Implement a Scene System with UI to easily create new Scenes 
- Add Objects to that scene in the form of 2D objects, 3D objects, Camera and Lights.
- Edit Predefined properties of said objects such as color and World Position.

These would help the user in creating their own scenes and easily debug effect on pre-defined template scenes.

- Empty Window

<img class="article-screenshot" src="/assets/projects/renderer2.png" alt=""/>

- New Scene

<img class="article-screenshot" src="/assets/projects/renderer3.png" alt=""/>

- Adding New Actors to the Scene

<img class="article-screenshot" src="/assets/projects/renderer4.png" alt=""/>

- Changing properties such as Position, Rotation, Color, etc. via the UI

<img class="article-screenshot" src="/assets/projects/renderer5.png" alt=""/>

- Applying Template Textures to Objects

<img class="article-screenshot" src="/assets/projects/renderer6.png" alt=""/>

- Importing 3D Models to a Scene

<img class="article-screenshot" src="/assets/projects/renderer7.png" alt=""/>
