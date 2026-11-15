# Taufik's Portfolio

My portfolio website, built with **HTML, CSS and JavaScript**.
It shows my websites and my 2D and 3D animation work, and it works on phones too.

## Files

- `index.html`: the page (Home, About, Skills, Projects, Contact)
- `style.css`: all the styling, colors can be changed at the top (`:root`)
- `script.js`: typing effect, dark/light theme, mobile menu, project filter, picture/video viewer
- `images/taufik.jpeg`: profile photo (a big "T" is shown if it is missing)
- `images/projects/`: pictures for the project cards
- `videos/`: (optional) animation videos, create this folder when you need it

## Add a picture to a project

The cards look for these picture names, so you can just save a file with the same name:

| Card | Picture file |
| --- | --- |
| This Portfolio | `images/projects/portfolio.jpg` |
| 2D Animation | `images/projects/animation-2d.jpg` |
| 3D Animation | `images/projects/animation-3d.jpg` |

A picture with the ratio 16:10 (for example 1280 x 800) looks best.
Tap or click a picture on the website to open it bigger.

## Add a new project

1. In `index.html`, find the comment `HOW TO ADD YOUR OWN PROJECT`.
2. Copy one whole `<article class="project-card"> ... </article>` block.
3. Change the picture name, `data-category` (`web`, `2d` or `3d`), title, text and tags.

## Add an animation video

- Put the file in a folder called `videos`, then add `data-video="videos/my-animation.mp4"`
  to the `<button class="project-thumb">` of that card. It plays when the picture is tapped.
- Or link to YouTube: `<a class="link-arrow" href="YOUR-LINK">Watch video</a>`.

## How to view

Open `index.html` in a browser.
