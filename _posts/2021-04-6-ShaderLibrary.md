---
layout: project
title: "Shader Library"
author: Siddhartha
permalink: /shader-library/
type: "Self-project"
engine: "ShaderToy"
language: "GLSL"
platform: "PC"
description: "A collection of pixel shaders written on the ShaderToy platform. Utilizing perlin, fractal, voronoi noise to generate complex shaders."
image: "/assets/projects/shader0.png"
---

A library of pixel shaders written on ShaderToy. Most of these shaders are based on the concepts of procedural generation.

- ShaderToy: <a href="https://www.shadertoy.com/user/kingcrimson1112">kingcrimson1112</a>
- Source: <a href="https://github.com/sps1112/shader-library">sps1112/shader-library</a>

Pixel Shaders run for every single pixel on the screen. For each pixel we will have the pixel position as the input. Pixel position is in the format (X, Y) which ranges from (0, 0)[bottom left] to(MaxX, MaxY)[top right]. 

The pixel code will output a color value which will be the color of that pixel. The combined output for all the pixels will give us the image. By using the time variable, we can create shaders which loop or change overtime.

Example shaders implemented in ShaderToy:-

- A 2D Graph shader where we can give an equation of the format [f(x, y) = 0]. The output graph or area under the graph will be displayed.

<img class="article-screenshot" src="/assets/projects/shader0.png" alt=""/>

<div class="code-container">
<pre class="code-block">
...
// 1. Setup Data

// Gets the Y limit for square grid
float xLimit = (yLimit + 1.0f) * (iResolution.x / iResolution.y) - 1.0f;

// From (0 to 1)
vec2 uv = fragCoord / iResolution.xy;

// From (-1 to 1)
vec2 pos = (uv * 2.0f) - 1.0f;

// From (-X to X, -Y to Y)
pos.x *= (xLimit + 1.0f);
pos.y *= (yLimit + 1.0f);

// 2. Setup Color

// a. Default Color is the Background
vec3 col = bgColor;

// b. If the point lies on the grid lines, then change color
if(check_point(pos.x, xLimit , iResolution.x) || check_point(pos.y, yLimit, iResolution.y))
{
    col = gridColor;
    if((check_point(pos.x, xLimit , iResolution.x) && get_int(pos.x) == 0.0f) || 
        (check_point(pos.y, yLimit , iResolution.y) && get_int(pos.y) == 0.0f))
    {
        col = axesColor;
    }
}

// c. If the point satisfies the Equation, then change color
if(check_equation(pos))
{
    col = eqColor;
}

// 3. Output to screen
fragColor = vec4(col,1.0);
...
</pre>
</div>

- A wood shader using octave for distoring the grooves. Cyclic loops of increasing radii are rendered, their width and distance is altered and distorition is applied by applying octave noise.

<img class="article-screenshot" src="/assets/projects/shader1.png" alt=""/>

<div class="code-container">
<pre class="code-block">
...
vec2 uv=fragCoord/iResolution.xy;
uv=uv*2.0f-1.0f;
uv.x*=(iResolution.x/iResolution.y);
uv*=xScale*yScale;

float fac=4.0f;
float freq=1.5f;
float t=get_octave_noise(freq*uv/(xScale*yScale));

float p = sqrt(pow(uv.x*xScale,2.0f)+pow(uv.y*yScale,2.0f));
p += t*fac;
float h = sin(p);

h=h*h;
h=1.0f-h;
h+=0.2f;
h=pow(h,2.0f);
h=smoothstep(h,-1.0f,-0.2f);

vec3 col=mix(baseCol,detailCol*h,h);  

// Output to screen
fragColor = vec4(col,1.0);
...
</pre>
</div>

- A water shader using vornoi noise. The image is divided into square grids and voronoi noise is generated using distance to a random point in each grid cell. This noise is amplified and colored to give water-like imagery.

<img class="article-screenshot" src="/assets/projects/shader2.png" alt=""/>

<div class="code-container">
<pre class="code-block">
...
// Gets UVs
vec2 uv=fragCoord/iResolution.y;
uv*=float(GRID_HEIGHT);

// Gets Offset
vec2 offset=vec2(0.0f);
offset.y=-iTime*3.0f;
offset.x=cos(iTime*0.5f)*2.0f;

// Get Height Map
float h=get_voronoi_noise(uv+offset) + get_voronoi_noise(uv+offset*0.4f);
h=clamp(h*0.7f,0.0f,1.0f);
h=pow(h,p);

// Final Color
vec3 col=vec3(h)*highlightCol+waterCol;

// Output to screen
fragColor = vec4(col,1.0);
...
</pre>
</div>

- A fire shader using octave and fractal noise. Height map is generated using octave noise, limited to a cone like shape and passed through a circular alpha map. The output is mixed with a fractal noise to get wavy fire-like patterns. These colored and translated over-time to give the fire shader.

<img class="article-screenshot" src="/assets/projects/shader3.png" alt=""/>

<div class="code-container">
<pre class="code-block">
...
darkCol=vec3(0.0f,0.05f,0.1f);
lightCol=vec3(0.0f,0.85f,0.15f);

// Get Octave Height
float hF = get_octave_noise(pos*lF.x,lF.y,lF.z);
float hB = get_octave_noise(pos*lB.x,lB.y,lB.z);
hF=pow(hF,1.25f)*1.1f;
hB*=0.75f;

// Get Fractal Height
float fF=get_fractal_height(pos*lF.x,lF.y,lF.z);
float fB=get_fractal_height(pos*lB.x,lB.y,lB.z);

// Apply Limits
vec4 limF=limitsF;
if(pos.x<limF.x || pos.x>limF.y || pos.y<limF.z || pos.y > limF.w)
{
    hF=0.0f;
}
vec4 limB=limitsB;
if(pos.x<limB.x || pos.x>limB.y || pos.y<limB.z || pos.y > limB.w)
{
    hB=0.0f;
}

// Apply Alpha Limits
float h1=distance(pos,cF.xy)/cF.z;
h1=clamp(h1,0.0f,1.0f);
h1=1.0f-h1;
hF*=h1*1.5f;

float h2=distance(pos,cB.xy)/cB.z;
h2=clamp(h2,0.0f,1.0f);
h2=1.0f-h2;
hB*=h2*1.75f;

// Apply Fractal
hF*=fF;
hF=smoothstep(0.0f,0.35f,hF);
hB*=fB;
hB=smoothstep(0.0f,0.35f,hB);


// Apply Threshold
if(hF<0.25f)
{
    hF=0.0f;
}
if(hB<0.05f)
{
    hB=0.0f;
}
    
// Apply Color
vec3 col=mix(darkCol, vec3(0.0f),pos.y-0.2f*sin(1.25f*iTime));
if(hB>0.0f)
{
    col=mix(darkCol,mix(darkCol,lightCol,0.5f),hB*1.25f);
    if(hB<=0.06f)
    {
        col=vec3(0.25f*darkCol);
    }
}
if(hF>0.0f)
{
    col=mix(darkCol,lightCol,hF);
    if(hF<=0.28f)
    {
        col=vec3(0.5f*darkCol);
    }
}
return col;
...
</pre>
</div>

- Map shader based on octave noise. Height map is generated and from it we can create a shadow map. After apply a falloff map, we can get a closed map and define regions which are inside the map. The map is colored based on a region array and the colors get blended based on the height value. Finally a translucent cloud map and shadow map is applied to regions left inside by the falloff. This map is offsetted over-time to get a moving map.

<img class="article-screenshot" src="/assets/projects/shader4.png" alt=""/>

<div class="code-container">
<pre class="code-block">
...
    bool insideMap=true;
    float timeFac=0.85f;
    vec3 shadowMap=vec3(1.0f);
    bool applyShadow=false;
    
    // Get Height
    float h= NOISE_FUNCTION(uv,timeFac);
    vec3 col=vec3(h);
    
#if ENABLE_LIGHT
    vec2 lightDir=vec2(1.0f,0.0f);
    float theta=float(LIGHT_ANGLE + iTime*45.0f)*(3.1416f/180.0f);
    mat2 rot=mat2(cos(theta), -sin(theta),
                  sin(theta), cos(theta));
    lightDir=normalize(lightDir*rot);
    
    float checkDist=float(LIGHT_CHECK);
    float hP=NOISE_FUNCTION(uv-lightDir*checkDist,timeFac);
    
    float xDiff=checkDist;
    float yDiff=(hP-h);
    float delH=tan(LIGHT_ELEVATION_ANGLE*(3.1416f/180.0f))*xDiff;
    
    if(yDiff<delH)
    {
        yDiff=0.0f;
    }
    yDiff=1.0f-yDiff;
    if(yDiff>=0.0f)
    {
        yDiff=pow(yDiff,LIGHT_INTENSITY);
    }
    shadowMap=vec3(yDiff);
#endif
    
#if APPLY_FALLOFF 
    // Apply Falloff
    float diff = falloff(uv,0.0f);
    if(h-diff<0.0f)
    {
        insideMap=false;
    }
    h = clamp(h-diff, 0.0f, 1.0f);
    col=vec3(h);
#endif

#if COLOR_MAP
    // Get Color from Region
    int index = get_region_index(h);
    col = regions[index];
#endif

    // Blend Region Colors
#if BLEND_REGIONS
    float h2 = ((index+1)<8?heights[index+1]:1.0f);
    float off = linear_step(heights[index],h2,h);
    //off=smoothstep(heights[index],h2,h);
    if(off>=MIX_THRESHOLD/2.0f)
    {
       applyShadow=true;
    }
    if(off>=MIX_THRESHOLD)
    {
        col = mix(col, mix(col, regions[index+1], off), MIX_FACTOR);
    }
#endif
    
    // Apply Cloud Cover
#if DRAW_CLOUDS
    if(insideMap)
    {
        float cH=cloud_map(uv);
        vec3 cloud = vec3(cH);
        if(cH>0.0f)
        {
            col = (cloud*CLOUD_BLEND)+col*(1.0f-CLOUD_BLEND);
        }
    }
#endif

    if(insideMap && index>2 && applyShadow)
    {
        col*=shadowMap;
    }
    
    return col;
...
</pre>
</div>
