---
layout: project
title: "A* Pathfinder"
author: Siddhartha
permalink: /path-finder/
type: "Self-project"
engine: "NA"
language: "C++"
platform: "PC"
description: "A pathfinder utlizing the A* algorithm for finding the optimal path on a 2d map. Used the sbt_image library for rendering pixel data into a png file."
image: "/assets/projects/path0.png"
---

A 2D Pathfinder written in C++ using the stb_image library for image rendering. The pathfinder utlizes the A* algorithm to find the optimal path.

- Source: <a href="https://github.com/sps1112/pathfinder-2d">sps1112/pathfinder-2d</a>

The pathfinder needs to be given a map, starting and ending point along with some configuration. Based on this data, it will output a map along with the solution.
- White is free node
- Black is blocked node
- Blue is starting node
- Red is ending node
- Green shows the path nodes

<div class="two-images">
<img class="article-screenshots" src="/assets/projects/path4.png" alt=""/>

<img class="article-screenshots" src="/assets/projects/path5.png" alt=""/>
</div>

If we change the ending node, a new optimal path will be calculated and shown in the output image.

<div class="two-images">
<img class="article-screenshots" src="/assets/projects/path6.png" alt=""/>

<img class="article-screenshots" src="/assets/projects/path7.png" alt=""/>
</div>

Specifications of the pathfinder:-
- We have to give a 2D Map which will define the grid nodes. The map is in format of an array with integer values. 0 means empty space, 1 means wall, 2 is starting point and 3 is end point.

<div class="code-container">
<pre class="code-block">
// The Grid State
...
int gridState[NUMBER_ROWS * NUMBER_COLUMNS] = {0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                                               1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0,
                                               0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                                               0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0,
                                               1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0,
                                               1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0,
                                               0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0,
                                               0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0,
                                               1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1,
                                               0, 0, 0, 1, 0, 3, 0, 0, 0, 1, 1, 0, 1, 0, 0,
                                               0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
                                               0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0,
                                               0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0,
                                               0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                                               0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};
...
</pre>
</div>

- This map data in converted into grid nodes whose data is stored locally. The Map will get rendered based on the previously defined color scheme.

<img class="article-screenshot" src="/assets/projects/path1.png" alt=""/>

- The data will be stored locally as a struct called GridNode. This node will allow us to access the distance cost values and check its corresponding neighbour nodes.
<div class="code-container">
<pre class="code-block">
// The Grid Node Struct
struct GridNode
{
    Position pos;                       // Position of node
    NODE_STATE state;                   // State of Grid Node
    std::vector<GridNode *> neighbours; // List of Neighbour Nodes
    int neighbourCount;                 // Neighbour Count
    GridNode *parent;                   // The node which comes before this node
    int gCost;                          // Distance from start Node
    int hCost;                          // Distance from target Node
    int index;                          // Index in the heap

    // Position Node Constuctor
    GridNode(Position pos_, NODE_STATE state_ = EMPTY) : 
    pos(pos_), state(state_), neighbourCount(0), index(0) {}

    // Node Constuctor
    GridNode(int x_ = 0, int y_ = 0, NODE_STATE state_ = EMPTY) : 
    pos(Position(x_, y_)), state(state_), neighbourCount(0), index(0) {}

    // Checks if Node is Traversable or not
    bool is_traversable()
    {
        return (state != BLOCKED);
    }

    // Returns the sum of gCost and hCost for the node
    int get_fcost()
    {
        return gCost + hCost;
    }

    // Compare Node with Item i.e. (Item - Node)
    int compare_item(GridNode *item)
    {
        int deltaF = (item->get_fcost() - get_fcost());
        return ((deltaF == 0) ? (item->hCost - hCost) : deltaF);
    }
};
</pre>
</div>

- The pathfinder algo uses the A* pathfinding to calculate the optimal path. We will maintain 2 list of nodes, OpenList and Closed List. On finding a node, we will add it to the open list. Once we check that given node, we will add it to the closed list. By comparing the fcost, gcost and hcost for the nodes, we can find the path.

<div class="code-container">
<pre class="code-block">
// Returns a Path for the Grid
Path find_path(Grid *grid)
{
    ... // Setup open and closed list
    while (openList.count > 0)
    {
        // Find Current Node
        GridNode *currentNode = openList.remove_first();
        closedList.add_to_heap(currentNode);
        if (currentNode == targetNode)
        {
            break;
        }
        // Check Neighbours
        for (int i = 0; i < currentNode->neighbourCount; i++)
        {
            GridNode *neighbour = currentNode->neighbours[i];
            if (neighbour->is_traversable() && !closedList.has_node(neighbour))
            {
                int moveCost = currentNode->gCost + get_distance_bw_nodes(currentNode, neighbour);
                if (!openList.has_node(neighbour) || moveCost < neighbour->gCost)
                {
                    neighbour->gCost = moveCost;
                    neighbour->hCost = get_distance_bw_nodes(targetNode, neighbour);
                    neighbour->parent = currentNode;
                    if (!openList.has_node(neighbour))
                    {
                        neighbour->state = (neighbour != targetNode) ? NEIGHBOUR : neighbour->state;
                        openList.add_to_heap(neighbour);
                    }
                    else
                    {
                        openList.update_item(neighbour);
                    }
                }
            }
        }
        if (currentNode != startNode)
        {
            currentNode->state = CHECKED;
        }
    }
    std::cout << "Path Found!!!" << std::endl;

    // Setup Path
    Path p;
    ... // Retrace path and store all nodes
    return p;
}
</pre>
</div>

- After calculating the optimal path, we can mark the target nodes and show the complete map. The original map and the map with path will be rendered into png images using the stb_image library.

<img class="article-screenshot" src="/assets/projects/path0.png" alt=""/>

- We can show the other neighbour nodes which were added to the heap to show number of tests which took place. The neighbour nodes are shown in a green-yellow tint in the output image.

<img class="article-screenshot" src="/assets/projects/path2.png" alt=""/>

- Different configuration settings can be used to setup the pathfinder. One such example is disabling diagonal movement. This leads to a different dataset for the neighbours of each node and will lead to a new path.

<div class="two-images">
<img class="article-screenshots" src="/assets/projects/path0.png" alt=""/>

<img class="article-screenshots" src="/assets/projects/path3.png" alt=""/>
</div>
