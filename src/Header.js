import React, { Component } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import './Header.css';
import TwitterIcon from '@material-ui/icons/Twitter';
import { Link } from 'react-router-dom';
export default class Header extends Component{
	//const [{characterName}, dispatch] = useStateValue();
	//const [character, setCharacter] = useState("");

	constructor(){
        super();
        this.state= {
		apiResponse: "",
		state: ""
		};

    }


	render(){
		return (
			<div className = 'header'>
					<Link to='/'>
					<img
						className = "header_logo"
						src='https://cdn.discordapp.com/attachments/495057525742501898/857474174443454474/smashtime.png' 
					/>
					</Link>
				<div className = "header_title">
					Are you a Wifi Warrior?
				</div>


				<div className = "header_nav">
					<Link to='/about'>
						<div className = 'header_option'>
							<span className = 'header_optionAbout'>
								About
							</span>
						</div>
					</Link>
					<a href="https://twitter.com/Skewersewer">
						<div className = 'header_option'>
							<TwitterIcon className = "header_twitterIcon" />
						</div>
					</a>
				</div>
			</div>
		)
	}
}