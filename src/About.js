import React from "react";
import "./About.css";
function About(){
	return <div className = "about">
		<div className = "about_info"> 
			<span className = 'about_infoText'>
					<p1>This is a project I've been working on for several months, since October 2020, I'm happy to have finished it! 
					It uses the database that smashdata.gg makes to get character stats for each player, and then graphs them on a chart.
					It has a lot of useful data entries for players, like state and country, which allow you to filter graphs per region.
					One unfortunate drawback of this is that most of these results are wifi results because offline locals and majors rarely 
					input character information. Another drawback is that I only included US and CA states because the state information for other
					countries' states isnt very expansive. 
					</p1>
			</span>
		</div>

		<div className = "about_me"> 
			<span className = 'about_meText'>
					<h1> About me </h1>
					<p1>I am a graduate from New York University's School of Engineering, where I studied computer science. I started coding for fun in middle School
					but I've never made a project people could use. I decided to work on this last year, but I scrapped it and tried again once I graduated, it was a very
					fun experience and I learned alot about fullstack development and javascript.</p1>
			</span>
		</div>
	</div>
}

export default About;