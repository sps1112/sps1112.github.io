---
layout: project
title: "Tactics: RPG"
author: Siddhartha
permalink: /tactics-rpg/
type: "Self-project"
engine: "Unity"
language: "C#"
platform: "PC"
description: "Isometric Tactics RPG inspired by games such as Final Fantasy: Tactics. Includes designer tools for level generation, scriptable objects for characters, custom pathfinding implementation for grid traversal and refined turn-based flow."
image: "/assets/projects/tactics0.png"
---
# Contents
  - [Level Generation](#level-generation)
  - [Basic Interactions](#basic-interactions)
  - [Turn Based Flow](#turn-based-flow)
  - [Grid Movement](#grid-movement)

An isometric tactics RPG made in Unity. The project is inspired by tactical turn-based JRPGs such as Final Fantasy Tactics for the Playstation and Final Fantasy Tactics: Advance for the Game Boy Advance.

- Web Build: <a href="https://kingcrimson1112.itch.io/tactics-rpg">Tactics RPG</a>
- Source: <a href="https://github.com/sps1112/tactics-rpg">sps1112/tactics-rpg</a>

The game is divided into various missions, with each mission taking place on a defined template level. Each level is an Isometric 3D grid made up of grid blocks. We can place our player character at any one of the spawning points at the start of the mission, and then begin. The enemy character will already be spawned. Future features for the game loop will include party-based gameplay, a combat system, and radiant missions.

<img class="article-screenshot" src="/assets/projects/tactics10.png" alt=""/>

### Level Generation

The project requires the creation of complex 3D grids and placement of obstacles on that grid. Since it can become tedious to generate or edit each element and assign references, we use Unity editor scripting to provide level generation tools. The editor tools edit a scriptable object that holds the grid data.

For the isometric 3D grid, we have defined its structure as:- 
- A 2D array of grid blocks. We can understand it as a N X M array.
  - We can define the number of rows and columns in the editor window.
- Each grid element in the grid can have a height value.
  - A height value of 0 means no grid at that position.
  - Any other value indicates it will be used in level generation.
- Prefabs needed to generate the level need to be assigned as:
  - *Bottom*: At the bottom of the each grid block.
  - *Mid*: At the middle. The number of middle blocks is the same as the height.
  - *Top*:  At the top of each block.
  
<img class="article-screenshot" src="/assets/projects/tactics6.png" alt=""/>

This window was created using Editor scripting. Here we can either create a new **Level layout** or edit an existing level and its properties. Once we have done that, we can save the layout asset and use it accordingly.

<div class="code-container">
<pre class="code-block">
// GridTool.cs
void OnGUI()
{
    ...
    if (state != WindowStates.EMPTY)
    {
      if (state == WindowStates.NEW)
      {
        ...
      }
      else if (state == WindowStates.LOAD)
      {
        asset = (LevelLayout)EditorGUILayout.ObjectField("Grid Layout", asset, typeof(LevelLayout), true);
      }
      if (asset != null)
      {
        GUILayout.Label("Edit Grid Layout:-");
        asset.levelName = EditorGUILayout.TextField("Level Name:- ", asset.levelName);
        asset.rows = EditorGUILayout.IntField("Rows:- ", asset.rows);
        asset.columns = EditorGUILayout.IntField("Columns:- ", asset.columns);
        asset.bottom = (GameObject)EditorGUILayout.ObjectField(
                       "Bottom", asset.bottom, typeof(GameObject), true);
        asset.mid = (GameObject)EditorGUILayout.ObjectField(
                       "Mid", asset.mid, typeof(GameObject), true);
        asset.top = (GameObject)EditorGUILayout.ObjectField(
                       "Top", asset.top, typeof(GameObject), true);
        GUILayout.BeginHorizontal();
        if (GUILayout.Button("Refresh Layout"))
        {
            asset.layout = new int[asset.rows * asset.columns];
        }
        if (GUILayout.Button("Initialize Layout"))
        {
            asset.layout = new int[asset.rows * asset.columns];
            for (int i = 0; i < asset.rows; i++)
            {
                for (int j = 0; j < asset.columns; j++)
                {
                    asset.layout[(asset.rows - i - 1) * asset.columns + j] = 1;
                }
            }
        }
        GUILayout.EndHorizontal();
        GUILayout.Label("Layout:- ");
        for (int i = 0; i < asset.rows; i++)
        {
          GUILayout.BeginHorizontal();
          for (int j = 0; j < asset.columns; j++)
          {
            asset.layout[(asset.rows - i - 1) * asset.columns + j] = 
            EditorGUILayout.IntField(asset.layout[(asset.rows - i - 1) * asset.columns + j]);
          }
          GUILayout.EndHorizontal();
        }
      }
      ...
    }
}
</pre>
</div>

In the same way, we can define another window to edit the **Obstacle layout**. We can specify the rows and columns of the grid, and define the obstacle prefab to place in a given position. We can place special grids such as **No Action Grids**, where actions such as combat cannot be performed. We also mark the possible spawn points for the enemies and player character.

<img class="article-screenshot" src="/assets/projects/tactics7.png" alt=""/>

Once we have both level layout and obstacle layout assets, we can define a Mission asset. This mission will take in variables such as mission name, level layout, obstacle layout and enemy list. We assign the mission to a template empty scene and here we will generate our grid with the obstacles placed on it. Once the mission starts, the enemies get spawned at random on the possible spawn points.

<div class="two-images">
<img class="article-screenshots" src="/assets/projects/tactics8.png" alt=""/>

<img class="article-screenshots" src="/assets/projects/tactics9.png" alt=""/>
</div>

### Basic Interactions

Various input options have been given to the player so that they can interact with the level. Some of them are:
- We can enter scan mode by holding Left-Shift button. This will allow us to scan any grid block. A UI widget will show the grid block's position, row, column and it will be colored to show whether it is a free grid or has an obstacle/enemy on it. This is done by a simple raycast from the cursor to the grid block.
  - Green means free grid.
  - Red means occupied grid.
  - Blue means we can perform the required action such as spawning or movement.
  - White means path grid.
  - Yellow means target grid.

<img class="article-screenshot" src="/assets/projects/tactics11.png" alt=""/>

- By holding down right-click and dragging the mouse, the player can move the camera and see other parts of the grid. The player can press F to focus on the player as the camera lerps back to player's position. Otherwise if they use any action, the camera snaps back by itself.
- Pressing Q and E allows the player to zoom in and out. This is done by changing the orthographic camera's size.
- Pressing Esc or P will open the pause menu which the player can use to go back to the menu and try out any other level.

<div class="code-container">
<pre class="code-block">
// InputManager.cs
void Update()
{
    if (Input.GetKeyDown(KeyCode.Escape) || Input.GetKeyDown(KeyCode.P)) // Toggle pause menu on or off
    {
        ui.TogglePause();
    }
    if (Input.GetKeyDown(KeyCode.Q)) // Zoom In
    {
        cam.orthographicSize -= 0.33f;
        cam.orthographicSize = CustomMath.ClampF(
            cam.orthographicSize,
            camFollow.camZoomLimits.x, camFollow.camZoomLimits.y);
    }
    if (Input.GetKeyDown(KeyCode.E)) // Zoom Out
    {
        cam.orthographicSize += 0.33f;
        cam.orthographicSize = CustomMath.ClampF(
            cam.orthographicSize,
            camFollow.camZoomLimits.x, camFollow.camZoomLimits.y);
    }
    if (canInput) // Can Input
    {
        if (Input.GetMouseButtonDown(1)) // Drag Start
        {
            camFollow.StartDrag();
        }
        if (!Input.GetMouseButton(1)) // Release Dragging
        {
            camFollow.StopDrag();
        }
        if (Input.GetKeyDown(KeyCode.F)) // Set back to snap
        {
            camFollow.Snap();
        }
        ...
    }
}
</pre>
</div>

### Turn Based Flow
Each mission flows through a turn system. There are two parts of a mission:
- **Player Spawning**.
  - The spawning process begins as the mission starts. We have a splash screen of the mission and level name. Then the camera pans to show the player spawning points.
  - Here we have the option to drag the camera and see the level and enemy placements. Satisfied, we can focus back on the spawn points.
  - We can left click on any of the possible grids to spawn the player. If you want to undo, simply press the Space to spawn again.
  - Once clicked, confirm your choice to start the mission.

<img class="article-screenshot" src="/assets/projects/tactics1.png" alt=""/>

<div class="code-container">
<pre class="code-block">
// TurnManager.cs

// Starts the player spawning process
public IEnumerator StartPlayerSpawning()
{
    yield return cam.StartCoroutine("SnapToTarget", levelManager.playerSpawnPoints[0].gameObject);
    SetPhase(TurnPhase.SPAWN);
    ui.ShowHint("Click on the highlighted grids to spawn the player", false);
    foreach (GridElement element in levelManager.playerSpawnPoints)
    {
        element.ActionHighlight();
    }
    playerPrefab.GetComponent&lt;Stats&gt;().SetStats();
    ui.ShowCharacterUI(true, playerPrefab.GetComponent&lt;Stats&gt;()); // Show Player UI
}

// Confirms the player's choice regarding player spawning
public IEnumerator ConfirmPlayerSpawning(GridElement element)
{
    yield return new WaitForSeconds(Time.deltaTime);
    if (levelManager.playerSpawnPoints.Contains(element))
    {
        SetPhase(TurnPhase.ENDING);
        element.ShowHighlight();
        ui.ShowHint("Press Enter/Left-Click to confirm spawning this character at the selected grid. Space to go back", false);
        GameObject tempPlayer = Instantiate(playerPrefab,
                                element.transform.position + 
                                Vector3.up * playerPrefab.GetComponent&lt;Pathfinding&gt;().maxYDiff,
                                Quaternion.identity);
        while (true)
        {
          if (Input.GetMouseButtonUp(0) || Input.GetKeyDown(KeyCode.Return))
          {
              foreach (GridElement grid in levelManager.playerSpawnPoints)
              {
                  grid.HideHighlight();
              }
              ui.HideHint();
              ...
              break;
          }
          if (Input.GetKeyDown(KeyCode.Space))
          {
              Destroy(tempPlayer);
              element.ActionHighlight();
              StartCoroutine("StartPlayerSpawning");
              yield break;
          }
          yield return new WaitForSeconds(Time.deltaTime);
        }
        StartCoroutine("StartGame");
    }
    else
    {
        ui.ShowHint("CANNOT SPAWN PLAYER AT THAT GRID!", true);
    }
}
</pre>
</div>

- **Mission Turns**.
  - Once the player has spawned, we can start the player's turn. At the bottom of the screen, we have a list of the next turns assigned to either player or enemy. This is done based on the speed stat of the characters.
  - We have actions available such as Move, Attack or Wait and we can click the respective button on the Actions UI to perform it.
  - In each turn, there are phases it goes through as shown below. The turn can transition from one phase to another by clicking buttons or by input. This will cause certain UI to enable or disable and turn input on or off.

<div class="code-container">
<pre class="code-block">
// TurnManager.cs

// Defines the types of turns available
public enum TurnType
{
    NONE, // No Turn
    PLAYER, // Player's Turn
    ENEMY, // Enemy's Turn
}

// The various phases which make up a turn
public enum TurnPhase
{
    NONE, // No phase
    SNAPPING, // Snapping to character
    SPAWN, // Spawning a player character
    CHECK, // Checking whether action left to go to menu
    MENU, // Choosing action in Action Menu
    MOVE, // Choosing grid to move to
    MOVING, // Moving to chosen grid
    ATTACK, // Choosing grid to attack
    ATTACKING, // Attacking chosen grid
    ENDING, // Ending this turn
}
</pre>
</div>

<img class="article-screenshot" src="/assets/projects/tactics2.png" alt=""/>

### Grid Movement
Both the player and enemy characters can move on the 3D grid using a custom implementation of the **A* algorithm** to find the optimal path between two grid blocks. You can access information on the implementation of the A* algorithm through this <a href="/pathfinder/">project</a>. 

For our 3D grid, the algorithm takes in the character's jump stat to define whether it can move from one block to the next. An example of this is, if the jump stat is 2 and the height gap between two blocks is 3, then the character cannot directly move to that block.

Now, the motion for the two types of character's takes place as:
- **Player Movement**
  - If it’s the player’s turn, we can click on the Move button to engage in the movement process. This changes the turn phase to **MOVE**.
  - We will be shown a list of possible grids we can move to and it will be highlighted as blue. The grids shown is dependent on the number of actions available to the player. 
    - This will be the same as the number of steps the player can move this turn.
  - We can click on any of these possible grids and the player will move to it. The A* algorithm will find the optimal path.
  - Once it has the path, the player model moves to the grid. The phase will change to **MOVING** and now we cannot perform any input such as dragging the camera.
  - Once the player has moved, we go to **CHECK** phase. If any actions are left, we can move again for the remaining actions, else the turn will end.
  - At the end, we can choose a direction the player should face and then, the turn will go the next character, be it player or enemy.

<img class="article-screenshot" src="/assets/projects/tactics3.png" alt=""/>

<div class="code-container">
<pre class="code-block">
// TurnManager.cs
public void ProcessGridClick(GridElement element)
{
    if (phase == TurnPhase.SPAWN) // Currently spawning for player
    {
        StartCoroutine("ConfirmPlayerSpawning", element);
    }
    else if (phase == TurnPhase.MOVE)
    {
        if (element.IsTraversable(true))
        {
            MovePlayer(element);
        }
    }
}
...
// Moves the player to the target grid
public void MovePlayer(GridElement target)
{
    if (highlightedGrids.Contains(target))
    {
        Path path = playerPath.GetPath(target);
        foreach (GridElement grid in highlightedGrids)
        {
            grid.HideHighlight();
        }
        inputManager.HideHighlight();
        target.ShowHighlight();
        StartCoroutine("MoveCharacterAlongPath", path);
    }
    else
    {
        ui.ShowHint("CANNOT TRAVEL TO TARGET GRID!", true);
    }
}
...
// Moves the character along the path
public IEnumerator MoveCharacterAlongPath(Path path)
{
    yield return cam.StartCoroutine("SnapToTarget", current);
    SetPhase(TurnPhase.MOVING);
    current.GetComponent&lt;Pathfinding&gt;().MoveViaPath(path);
}
</pre>
</div>

- **Enemy Movement**
  - If it's the enemy's turn, it will try to get close to the player character. Based on the actions, the enemy will show all the possible grids it can move to and turn phase changes to **MOVE**.
  - The enemy will try to process a path to the player. It will select all 4 neighbour grids to the player's current grid and try to find a path to all of them. Some of them, the enemy can reach while some it cannot. 
  - We should now have lists of paths to the player, both complete and incomplete. Out of all of these paths, we choose the path with the complete path with smallest length.
  - Now we have a path we need to follow. We can fix the path for the possible grids we can move to. 
    - Here, we will trace the path as long as it is inside our pool of grids. This gives the grid which will get us the closest to the player.
  - This new grid will be our target grid. Now the enemy will move along this path as the turn phase changes to **MOVING**.
  - Once it has moved, the enemy will turn to face the direction towards the player and end its turn.

<div class="two-images">
<img class="article-screenshots" src="/assets/projects/tactics4.png" alt=""/>

<img class="article-screenshots" src="/assets/projects/tactics5.png" alt=""/>
</div>

<div class="code-container">
<pre class="code-block">
// TurnManager.cs

// Moves the enemy to a player grid
public Path GetEnemyPath()
{
    ...
    foreach (GridElement neighbour in playerGrid.neighbours)
    {
        if (neighbour.IsTraversable(false))
        {
            if (Mathf.Abs(playerGrid.height - neighbour.height) <= enemyStats.character.jump)
            {
                Path nPath = enemyPath.GetPath(neighbour);
                int pDist = nPath.GetPathDistance() + enemyGrid.GetDistance(nPath.elements[0]);
                if (nPath.IsCompletePath(neighbour))
                {
                    ... // Add an entry to complete path
                }
                else
                {
                    ... // Add an entry to incomplete path
                }
            }
        }
    }
    Path path = new Path();
    if (completePaths.Count > 0)
    {
        path = completePaths[0];
    }
    else
    {
        path = incompletePaths[0];
    }
    path.FixForGrids(highlightedGrids);
    return path;
}
...
// Starts the enemy turn showing the grids and initiating action
IEnumerator StartEnemyTurn()
{
    yield return new WaitForSeconds(enemyTurnWaitTime); // Wait for a few seconds on the menu phase
    StartMovePhase();
    yield return new WaitForSeconds(enemyTurnWaitTime / 2.0f);
    foreach (GridElement grid in highlightedGrids)
    {
        grid.HideHighlight();
    }
    Path path = GetEnemyPath();
    GridElement targetGrid = path.elements[path.length - 1];
    targetGrid.ShowHighlight();
    ui.HideUI();
    yield return cam.StartCoroutine("SnapToTarget", targetGrid.gameObject);
    StartCoroutine("MoveCharacterAlongPath", path);
}
</pre>
</div>

In the current version, the player and enemy turns can take place one after the another. The enemy AI will try to find a way to the player character. As stated at the start, future versions of the project will include the combat system and party based gameplay. 

You can access the web build of the project <a href="https://kingcrimson1112.itch.io/tactics-rpg">here</a>.
