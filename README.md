<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/vfields/fitlit">
    <img src="images/favicon.ico" alt="Logo" width="80" height="80">
  </a>

<!-- HEADER -->
<h3 align="center">FitLit</h3>
  <p align="center">
    An Activity Tracker
    <br />
    <a href="https://github.com/vfields/fitlit"><strong>Explore the docs »</strong></a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#setup">Setup</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li>
        <a href="#notes">Notes</a>
        <ul>
            <li><a href="#reflections">Reflections</a>
        </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About The Project

[![Demo][product-demo]](images/demo.gif)
Are you looking for an easy way to track your wellness activities? Look no further! FitLit will dynamically display your different activitiy inputted data, and allow you to compare your daily vs. weekly measurements. You can even see how your numbers stack up against the average of every other users' inputs in the database, as well as your individual all-time averages.

<br />
This project was assigned during the second module of Turing's Front-End Engineering program, about 8 weeks into its students learning how to code. The details of this project are outlined in [this project spec](http://frontend.turing.io/projects/fitlit.html).

### Built With

* [![JavaScript][JavaScript.com]][JavaScript-url]
* [![CSS][w3.org/Style/CSS/Overview.en.html]][CSS-url]
* [![HTML5][w3.org]][HTML-url]
* [![Mocha][https://mochajs.org/]][Mocha-url]
* [![Chai][https://www.chaijs.com/]][Chai-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Setup

- Clone the repository to your local machine
- `cd` into the project
- `open index.html`
- Grab a partner and take turns picking grid squares

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Roadmap

- [ ] Utilize JSON and localStorage to save the game data locally so it persists when the page is refreshed
- [ ] Allow players to choose their token

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Notes

Planning documents for this project: [Google Doc](https://docs.google.com/document/d/1CoiL1VDHqBoSPtplJtX_yfX9O63XWgLtd8kR_6Rthu0/edit)

### Reflections
* Wins
I think the planning I put into this project from the beginning helped me visualize every element I would need and how it would all fit together

What I enjoyed most about this project was learning about and applying all the smaller pieces that go into a well-rounded project (i.e. adding a license and pull request template).

* Challenges
Trying to capture ever win condition without utilizing an array iterator was difficult, and the solution I came up with had a lot of nested for loops and conditionals

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

Hazel Pablo
Hunter Monroe
Tori Fields
Matthew Press - [@MatthewPres2](https://twitter.com/MatthewPres2) - press.matt14@gmail.com

Project Link: [https://github.com/vfields/fitlit](https://github.com/vfields/fitlit)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/matthew-press-813961246/
[product-demo]: images/demo.gif
[JavaScript.com]: https://img.shields.io/badge/-JavaScript-yellow
[JavaScript-url]: https://www.javascript.com/
[w3.org/Style/CSS/Overview.en.html]: https://img.shields.io/badge/-CSS-blue
[CSS-url]: https://www.w3.org/Style/CSS/Overview.en.html
[w3.org]: https://img.shields.io/badge/-HTML5-red
[HTML-url]: https://www.w3.org/
[Mocha-url]: https://mochajs.org/
[https://mochajs.org/]: 
[Chai-url]: https://www.chaijs.com/
[https://www.chaijs.com/]:

## Setup

1. Within your group, decide on one person to have the project repository (repo) on their GitHub account. Then, that person should fork this repo - on the top right corner of this page, click the **Fork** button.
1. Both memebers of the group should clone down the _forked_ repo. Since you don't want to name your project "activity-tracker-starter", you can use an optional argument when you run git clone (you replace the [...] with the terminal command arguments): `git clone [remote-address] [what you want to name the repo]`
1. Once you have cloned the repo, change into the directory and install the project dependencies. Run `npm install` to install project dependencies.
1. Run `npm start` in the terminal to see the HTML page (you should see some boilerplate HTML displayed on the page).  `Control + C` is the command to stop running the local server.  Closing the terminal without stopping the server first could allow the server to continue to run in the background and cause problems. This command is not specific to Webpack; make note of it for future use.   
1. Make sure both members of your team are collaborators on the forked repo.  
1. Do not run `npm audit fix --force`.  This will update to the latest version of packages.  We need to be using `webpack-dev-server@3.11.2` which is not the latest version.  If you start to run into Webpack errors, first check that all group members are using the correct version.  
