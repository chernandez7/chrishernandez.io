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

Technology Used
*  C++
*  OpenGL

[__Repository__](https://github.com/chernandez7/Moon-Phases)

This project started as the final project to my PHYS 102 (Astronomy) course, while the requirments stated that we were supposed to make a diorama I convinced my professor to let me create a piece of software.

---

## Relativiti

Technology Used
*  Nodejs
*  Polymer
*  Cordova
*  Travis CI

[__Repository__](https://github.com/Rhernandez513/Relativiti)

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/gjB-TBw-Pcc?rel=0" frameborder="0" allowfullscreen></iframe>

This project started as the final project to my COMP 374 (Software Engineering) course and was meant to be a webapp that took in audio and converted it to sheet music. It was never finished so I don't have a final video to show, but I do have some test videos.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/LDq3luUazs4?rel=0" frameborder="0" allowfullscreen></iframe>

This project was my first time using JavaScript and HTML. Also the first time that a project was rigorously documented and planned before it was started. First time creating build scripts and continuous deployment across multiple platforms.

Since I was fairly new and the project was pretty ambitious it never got past the stage of parsing out note Hz into actual note values (which is fairly difficult). But this project did lead to the revitalization of my universities ACM student chapter.

I would love to make a derivative of this project or continue it one day though.

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
