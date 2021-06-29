import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom';
function Home(){
	return (
		<div className = "home">
			
			<div className = "home_title"> 
				<span className = 'home_titleText'>
					<Link to='/graph/all'>
						<p1 href='graph'>Click Here to make a Graph!</p1>
					</Link>
					</span>
			</div>
		</div>
	)
}

export default Home