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
image: "/assets/projects/noise9.png"
---

A Noise Generation library written in C++ using the stb_image library for rendering to an image. The noise maps utlise procedural random number generators for generating random numbers. These are mapped to an 2D Array of pixel data which can be converted into a .png file.

- Source: <a href="https://github.com/sps1112/noise-generator">sps1112/noise-generator</a>

<img class="article-screenshot" src="/assets/projects/noise9.png" alt="" />

Various noise maps which can be generated using the library:-

### Rendering random noise to a 2D Image.

Generated a 2D array of pixels with each pixel having a value b/w 0.0 to 1.0. The value of 0.0 will imply black color and 1.0 will imply white color.

<img class="article-screenshot" src="/assets/projects/noise0.png" alt="" />

Code sample for the random noise generation:-

<div class="code-container">
<pre class="code-block">
// Gets a Random Noise Map
float *get_noisemap(int rows, int columns)
{
    float *noiseMap = new float[rows * columns];
    for (int y = 0; y < rows; y++)
    {
        for (int x = 0; x < columns; x++)
        {
            noiseMap[(y * columns) + x] = get_random_noise();
        }
    }
    return noiseMap;
}
</pre>
</div>

### Rendering Perlin Noise to a 2D Map

The values of each pixel in a perlin noise map will be dependent on the X and Y coordinates of that pixel. Nearby pixels will have similar values and the pixel values will lie b/w 0.0 to 1.0.

<img class="article-screenshot" src="/assets/projects/noise1.png" alt="" />

Code sample for the perlin noise generation:-

<div class="code-container">
<pre class="code-block">
// Gets a Perlin Noise Map
float *get_noisemap(int rows, int columns, float scale)
{
    ...
    PerlinNoiseGenerator pn(seed);
    for (int y = 0; y < rows; y++)
    {
        for (int x = 0; x < columns; x++)
        {
            float sampleX = (x / scale);
            float sampleY = (y / scale);
            float noiseVal = get_perlin_noise(sampleX, sampleY, &pn);
            noiseMap[(y * columns) + x] = noiseVal;
        }
    }
    return noiseMap;
}
</pre>
</div>

### Rendering Octave Noise to a 2D Map

Multiple layers of perlin noise can be layered upon one another to create octave noise. Each layer will have smaller amplitude and higher frequency. These layers are scaled in the range of [-1, 1] and added to each other. The final octave noise will then be obtained and scaled in the range of [0, 1]. 

<img class="article-screenshot" src="/assets/projects/noise2.png" alt="" />

Code sample for the octave noise generation:-

<div class="code-container">
<pre class="code-block">
...
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
...
</pre>
</div>

### Generating Color Maps from Octave noise

A color map of the octave noise can be made by defining region thresholds for the noise values. Each region will have a color value and a minimum height. Based on the noise value of a given pixel, we find the region and assign a color value to that pixel.
  
<div class="two-images">
<img class="article-screenshots" src="/assets/projects/noise2.png" alt=""/>

<img class="article-screenshots" src="/assets/projects/noise3.png" alt=""/>
</div>

Code sample for the color map:-

<div class="code-container">
<pre class="code-block">
// The Default Map Sections for a Color Map
const MapSection mapSections[MAP_REGIONS] = {
    MapSection(DARK_BLUE),
    MapSection(OCEAN_BLUE, 0.05f),
    MapSection(DARK_YELLOW, 0.37f),
    MapSection(LAND_GREEN, 0.4f),
    MapSection(DARK_GREEN, 0.6f),
    MapSection(LIGHT_BROWN, 0.725f),
    MapSection(DARK_BROWN, 0.85f),
    MapSection(LIGHT_BLUE, 0.925f)};

...

// Gets the Section from the pixel height
Colorf get_color_from_sections(float height)
{
    int n = 0;
    for (int i = 0; i < MAP_REGIONS; i++)
    {
        if (mapSections[i].height > height)
        {
            break;
        }
        n = i;
    }
    return mapSections[n].col;
}
</pre>
</div>

### Apply Falloff to noise maps

A falloff map can be generated by using a maximum check on the pixel coordinates. This can be further altered by passing through a function as:- [x ^ a / (x ^ a + {b * (1 - x)} ^ a)]

<img class="article-screenshot" src="/assets/projects/noise4.png" alt=""/>

Code Sample for falloff map generation:-

<div class="code-container">
<pre class="code-block">
// Gets a FallOff Map
...
    for (int i = 0; i < rows; i++)
    {
        for (int j = 0; j < columns; j++)
        {
            float y = ((float)i / rows) * 2 - 1;
            float x = ((float)j / columns) * 2 - 1;
            float val = max(absolute(x), absolute(y));
            falloffmap[(i * columns) + j] = clamp(eval_falloff_value(val, curve, shift));
        }
    }
...

...
// Function transformation for Falloff map
float eval_falloff_value(float val, float curve, float shift)
{
    float a = curve;
    float b = shift;
    val = pow(val, a) / (pow(val, a) + pow(b - (b * val), a));
    return val;
}
</pre>
</div>

The falloff map can be subtracted from the octave noise map to get a closed noise map.

<div class="two-images">
<img class="article-screenshots" src="/assets/projects/noise2.png" alt=""/>

<img class="article-screenshots" src="/assets/projects/noise5.png" alt=""/>
</div>

This noise map can be used to create a color map. The color maps will be covered from all sides to get a more usable map.
<div class="two-images">
<img class="article-screenshots" src="/assets/projects/noise5.png" alt=""/>

<img class="article-screenshots" src="/assets/projects/noise6.png" alt=""/>
</div>

### Color Blending in Color Maps

The color value for a pixel in a color map is region-dependent. If the value is 0.30 or 0.32, the color value will be same if they lie in the same region. A better solution would be if the color value gets interpolated b/w the color values of adjacent regions.

<img class="article-screenshot" src="/assets/projects/noise7.png" alt=""/>

Code Sample for the color blending in color map:-

<div class="code-container">
<pre class="code-block">
...
    float height = texData->tex[texIndex];
    int index = get_index_from_height(height);
    Colorf col = mapSections[index].col;

#if BLEND_REGIONS
    int indexB = index + 1;
    float h2 = 1.0f;
    Colorf col2(1.0f);
    if (indexB < MAP_REGIONS)
    {
        h2 = mapSections[indexB].height;
        col2 = mapSections[indexB].col;
    }

    float off = inverse_lerp(height, mapSections[index].height, h2);
    if (off > BLEND_THRESHOLD)
    {
        Colorf mixCol = col_lerp(col, col2, off);
        col = col_lerp(col, mixCol, BLEND_FACTOR);
    }
#endif

    int imgIndex = texData->get_index(newI, newJ);
    img[imgIndex] = get_color(col);
...
</pre>
</div>

Comparision with color maps with no blending(left) and one with blending(right):-

<div class="two-images">
<img class="article-screenshots" src="/assets/projects/noise6.png" alt=""/>

<img class="article-screenshots" src="/assets/projects/noise7.png" alt=""/>
</div>

### Level of Detail (LOD) for image generation

For the output image, we can define Level of Detail (LOD) such that closer pixels have the same values. This leads to smaller files sizes and fewer number of calculations to be done.

<div class="two-images">
<img class="article-screenshots" src="/assets/projects/noise7.png" alt=""/>

<img class="article-screenshots" src="/assets/projects/noise8.png" alt=""/>
</div>

Code sample for defining LODs for output image:-

<div class="code-container">
<pre class="code-block">
// Without LODs
//--------------------
for (int i = 0; i < rows; i++)
{
    for (int j = 0; j < columns; j++)
    {
        ...
        int imgIndex = texData->get_index(i, j);
        img[imgIndex] = get_color(col);
    }
}

// With LODs
//--------------------
for (int i = 0; i < rows; i += 1 + imgLOD)
{
    for (int j = 0; j < columns; j += 1 + imgLOD)
    {
        int texIndex = texData->get_index(i, j);
        int iEnd = clampi(i + imgLOD, 0, rows - 1);
        int jEnd = clamp(j + imgLOD, 0, columns - 1);
        for (int newI = i; newI <= iEnd; newI++)
        {
            for (int newJ = j; newJ <= jEnd; newJ++)
            {
                ...
                int imgIndex = texData->get_index(newI, newJ);
                img[imgIndex] = get_color(col);
            }
        }
    }
}
</pre>
</div>
