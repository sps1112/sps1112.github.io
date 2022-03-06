---
layout: project
title: "Noise Generator"
author: Siddhartha
permalink: /noise-gen/
type: "Self-project"
engine: "NA"
language: "C++"
platform: "PC"
description: "A Noise generation library written in C++ using stb_image for rendering to an image. Generate random noise, perlin noise and create 2d maps using octave noise."
image: "/assets/projects/noise3.png"
---

A Procedural Map Generator based on Perlin-Noise. The project was made in C++.

Features implemented in the project:-
- Rendering random noise to a 2D Image.
 
<img class="article-screenshot" src="/assets/projects/noise0.png" alt="" />

- Rendering Perlin Noise to a 2D Map

<img class="article-screenshot" src="/assets/projects/noise1.png" alt="" />

- Develop a 2d heightmap to a texture from configurable Perlin-Noise settings. This involved setting up a Perlin-Noise Generator which produces a 2d array. The array would be translated into a texture created at runtime which could be attached to a material.

<img class="article-screenshot" src="/assets/projects/noise2.png" alt="" />

Code sample for the height map generation:-
<div class="code-container">
<pre class="code-block">
for (int y = 0; y < rows; y++)
{
    for (int x = 0; x < columns; x++)
    {
        float amplitude = 1;
        float frequency = 1;
        float noiseVal = 0;
        for (int i = 0; i < octaves; i++)
        {
            float sampleX = (((x - halfX) / scale) * frequency) + octaveOffsets[(i * 2)];
            float sampleY = (((y - halfY) / scale) * frequency) + octaveOffsets[(i * 2) + 1];
            float noise = (get_perlin_noise(sampleX, sampleY, &pn) * 2) - 1;
            noiseVal += noise * amplitude;
            amplitude *= persistence;
            frequency *= lacunarity;
        }
        maxNoise = max(maxNoise, noiseVal);
        minNoise = min(minNoise, noiseVal);
        noiseMap[(y * columns) + x] = noiseVal;
    }
}
</pre>
</div>

- Generate a `Color-map` from the height map and apply it to a plane. The heightmap from before is converted to a Color-Map by defining a Struct of a Height Range and Color. The values from the heightmap are matched to the Color Range struct to get the color value and create Color-map texture. 

<img class="article-screenshot" src="/assets/projects/noise3.png" alt=""/>

- Apply fall-off to create enclosed maps. By subtracting some falloff-factor and clamping the values along the edges of the heightmap we obtain a closed texture which can be used to generate a closed map as such.

<img class="article-screenshot" src="/assets/projects/noise4.png" alt=""/>

<img class="article-screenshot" src="/assets/projects/noise5.png" alt=""/>

<img class="article-screenshot" src="/assets/projects/noise6.png" alt=""/>

- Add color blending to the color map

<img class="article-screenshot" src="/assets/projects/noise7.png" alt=""/>

- Also implemented features such as LODs to optimize CPU performance.

<img class="article-screenshot" src="/assets/projects/noise8.png" alt=""/>