import React from "react";
import "./About.css";
function About(){
	return <div className = "about">
		<div className = "about_info"> 
			<span className = 'about_infoText'>
					<h1> About smashti.me </h1>
					<p1>Smashti.me uses a database that smashdata.gg makes to get character stats for each player, and then graphs them on a chart.
					It has a lot of useful data entries for players, like state and country, which allow you to filter graphs per region.
					Most of this data pertains to online events because offline tournaments rarely input character information. 
					Additonally, I've limited the state information to US and CA only because many states outside these regions don't have data.
					</p1>
			</span>
		</div>

		<div className = "about_me"> 
			<span className = 'about_meText'>
					<h1> About me </h1>
					<p1>I am a graduate from New York University's School of Engineering, where I earned a Bachelors in Computer Science. I started coding for fun in middle school, 
					but up until now, I'd never created an application that could be useful for others. During my junior year at NYU, I joined a Smash Ultimate club which hosted 
					competitive tournaments.  Once the pandemic hit, all in-person club activities were put on hold. However, I still wanted to continue playing Smash Bros competitively, 
					so I turned to online tournaments! I quickly found that there was a lot of data available for online tournaments, and thought it would be useful to make a website that visually shows this data. 
					It ended up being a fun and edifying experience where I was able to teach myself fullstack development.</p1>
			</span>
		</div>
	</div>
}

export default About;