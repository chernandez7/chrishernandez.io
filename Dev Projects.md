---
layout: page
title: Dev Projects
---

---

Table of Contents

---

*  [Own The Spot](#Own-The-Spot)

*  [Tandlr](#Tandlr)

*  [NGHT / Barscan](#NGHT-Barscan)

*  [Aesthetic Kanji](#Aesthetic-Kanji)

*  [Moon Phases](#Moon-Phases)

*  [Relativiti](#Relativiti)

*  [Game of Life](#Game-of-Life)

*  [Boids](#Boids)
    *  [First Implementation](#First-Implementation)
    *  [Second Implementation](#Second-Implementation)

---

## Own The Spot

---

## Tandlr

---

## NGHT-Barscan

---

## Aesthetic Kanji

---

## Moon Phases

---

## Relativiti

---

## Game of Life

Technology Used
*  C++
*  OpenMP
*  Travis CI

[__Repository__](https://github.com/chernandez7/Game-of-Life)

![GoL](http://i.imgur.com/wfy4iMT.gif)

The Game of Life project started as the final project for my COMP 364 (High Performance Computing) course. I had access to and made use of the [TACC Supercomputer](https://portal.tacc.utexas.edu/user-guides/STAMPEDE) for parallelization in this project.

Benchmarks and analysis are in the repository so i'll leave this one as it is, but I will say that working with a huge amount of power and compute nodes really is fun.

---

## Boids

### First Implementation

Technology Used
*  C++
*  SFML

[__Repository__](https://github.com/chernandez7/Boids.git)

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/0RdnN7Sg1jA?rel=0" frameborder="0" allowfullscreen></iframe>

This project began as the final project to my COMP 271 (Data Structures) class. Originally I wanted it to be done in pure OpenGL but due to time constraints, I opted for SFML which wraps OpenGL quite nicely for C++.

As seen in the video above, I was able to get around ~120 bird-oids without framerate drops. The program itself wasn't very efficient so I wanted to remake the project one day.

I ended up doing that for my COMP 398 (Independent Study) course.

---

### Second Implementation

Technology Used
*  C++
*  CUDA
*  OpenGL

[__Repository__](https://github.com/chernandez7/cuda-boids)

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/8TYSsUS-DBk?rel=0" frameborder="0" allowfullscreen></iframe>

This time around I had a whole semester and a lot more experience as a developer. I ended up using CUDA for computing in parallel and OpenGL, this time I had some goals.

I wanted to:
*  Improve efficiency
*  Add the z-axis
*  Use OpenGL and CUDA together

Since I had some High Performance Computing knowledge up my sleeve now, this was a bit easier to do. Some troubles came from the new libraries and hardware acceleration that I didn't know too well but it worked out. Another interesting thing was that I had access to the [TACC Supercomputer](https://portal.tacc.utexas.edu/user-guides/STAMPEDE) which allowed me to run my implementation on a distributed system.
