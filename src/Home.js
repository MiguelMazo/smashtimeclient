import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom';
function Home(){
	return (
		<div className = "home">
			
			<div className = "home_title"> 
				<span className = 'home_titleText'>
					<Link to='/graph/all'>
						<div class="card"></div>
					</Link>
					</span>
			</div>
		</div>
	)
}

export default Home