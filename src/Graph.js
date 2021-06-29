import React, { PureComponent } from "react";
import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Label, LabelList} from 'recharts';
import Axios from 'axios';
import "./Graph.css";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

export default class Graph extends PureComponent{
	constructor(props){
        super(props);
        this.state= {
			state: "",
			apiResponse: [],
			keys: [],
			values: [],
			originalData: [],
			graphData: [],
			numOfEntries: 10,
			characterName: "",
			maxEntries: 0,
		};

    }

	//Region/State Change
	handleSelect = (event) => {
		this.setState({state: "" + event})
		var newData = [];

		if ("" + event !== ""){
			for (var i = 0; i < this.state.originalData.length; i++){
				if (this.state.originalData[i].state === "" + event || this.state.originalData[i].country === "" + event){
					newData.push(this.state.originalData[i]);
				}
			}

			this.setState({graphData: newData});
			if ("" + event === ""){
				this.setState({numOfEntries: this.state.numOfEntries});
			}
			else if (this.state.numOfEntries > newData.length){
				this.setState({numOfEntries: newData.length})
			}
		}
		
		else{
			this.setState({graphData: this.state.originalData});
			if ("" + event == ""){
				this.setState({numOfEntries: 10})
			}
			else if (this.state.numOfEntries > newData.length){
				this.setState({numOfEntries: this.state.originalData.length})
			}
		}
	}

	//Number of entries change
	handleInputChange = (event) => {
		event.preventDefault()
		if (parseInt(event.target.value) > this.state.maxEntries){
			this.setState({
				[event.target.name]: this.state.maxEntries
			})
		}
		else {
			this.setState({
				[event.target.name]: event.target.value
			})
		}
	}

	componentDidMount = () => {
		var charName = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);	

		if (charName === "banjokazooie"){
				this.setState({characterName: "Banjo & Kazooie"})
		}

		else if (charName === "bowserjr"){
				this.setState({characterName: "Bowser Jr."})
		}

		else if (charName === "captainfalcon"){
				this.setState({characterName: "Captain Falcon"})
		}

		else if (charName === "all"){
				this.setState({characterName: ""})
		}

		else if (charName === "darkpit"){
				this.setState({characterName: "Dark Pit"})
		}

		else if (charName === "darksamus"){
				this.setState({characterName: "Dark Samus"})
		}

		else if (charName === "diddykong"){
				this.setState({characterName: "Diddy Kong"})
		}

		else if (charName === "donkeykong"){
				this.setState({characterName: "Donkey Kong"})
		}

		else if (charName === "drmario"){
				this.setState({characterName: "Dr. Mario"})
		}

		else if (charName === "duckhunt"){
				this.setState({characterName: "Duck Hunt"})
		}
		else if (charName === "iceclimbers"){
				this.setState({characterName: "Ice Climbers"})
		}
		else if (charName === "kingdedede"){
				this.setState({characterName: "King Dedede"})
		}
		else if (charName === "littlemac"){
				this.setState({characterName: "Little Mac"})
		}
		else if (charName === "megaman"){
				this.setState({characterName: "Mega Man"})
		}
		else if (charName === "metaknight"){
				this.setState({characterName: "Meta Knight"})
		}
		else if (charName === "miibrawler"){
				this.setState({characterName: "Mii Brawler"})
		}
		else if (charName === "miigunner"){
				this.setState({characterName: "Mii Gunner"})
		}
		else if (charName === "miiswordfighter"){
				this.setState({characterName: "Mii Swordfighter"})
		}
		else if (charName === "minmin"){
				this.setState({characterName: "Min Min"})
		}
		else if (charName === "mrgameandwatch"){
				this.setState({characterName: "Mr. Game & Watch"})
		}
		else if (charName === "piranhaplant"){
				this.setState({characterName: "Piranha Plant"})
		}
		else if (charName === "rosalina"){
				this.setState({characterName: "Rosalina & Luma"})
		}
		else if (charName === "toonlink"){
				this.setState({characterName: "Toon Link"})
		}
		else if (charName === "wiifittrainer"){
				this.setState({characterName: "Wii Fit Trainer"})
		}
		else if (charName === "younglink"){
				this.setState({characterName: "Young Link"})
		}
		else if (charName === "zerosuitsamus"){
				this.setState({characterName: "Zero Suit Samus"})
		}
		else if (charName !== ""){
			this.setState({characterName: charName[0].toUpperCase() + charName.substring(1)});
		}

		console.log("Entering GEt");
        Axios.get("http://smashtimeapi-env.eba-tdys5rjx.us-east-2.elasticbeanstalk.com" + '/testAPI/?query=' + charName).then((response) => {
			console.log("Getting Response.")
			console.log(response.data)
            this.setState({apiResponse: response.data})
			var data = [];
			for (var i = 0; i < this.state.apiResponse.length; i++){
				var dataObject = {
					tag: this.state.apiResponse[i].tag,
					value: this.state.apiResponse[i].gameCount,
					state: this.state.apiResponse[i].state,
					country: this.state.apiResponse[i].country, 
				}
				data.push(dataObject);
			}
			this.setState({maxEntries: this.state.apiResponse.length})
			this.setState({graphData: data})
			this.setState({originalData: data})
        });
    }

	render(){

	//Data is here 
	if (this.state.apiResponse[0] && this.state.apiResponse[0].tag){
		return <div className = "graph">
			<div className = "graph_interface">
					<DropdownButton menuAlign="left" className = "dropdownMenu" id="dropdown-basic-button" variant="dark" title="Character">
					<div className = "ddm_wrapper">
						<Dropdown.Item className = "dropdownMenu_item" href="all">ALL</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="banjokazooie">Banjo & Kazooie</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="bayonetta">Bayonetta</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="bowser">Bowser</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="bowserjr">Bowser Jr.</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="byleth">Byleth</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="captainfalcon">Captain Falcon</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="chrom">Chrom</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="cloud">Cloud</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="corrin">Corrin</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="daisy">Daisy</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="darkpit">Dark Pit</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="darksamus">Dark Samus</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="diddykong">Diddy Kong</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="donkeykong">Donkey Kong</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="drmario">Dr. Mario</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="duckhunt">Duck Hunt</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="fox">Fox</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="ganondorf">Ganondorf</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="greninja">Greninja</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="hero">Hero</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="iceclimbers">Ice Climbers</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="ike">Ike</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="incineroar">Incineroar</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="inkling">Inkling</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="isabelle">Isabelle</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="jigglypuff">Jigglypuff</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="joker">Joker</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="kazuya">Kazuya</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="ken">Ken</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="kingdedede">King Dedede</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="kirby">Kirby</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="link">Link</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="littlemac">Little Mac</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="lucario">Lucario</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="lucas">Lucas</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="lucina">Lucina</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="luigi">Luigi</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="mario">Mario</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="marth">Marth</Dropdown.Item>
					    <Dropdown.Item className = "dropdownMenu_item" href="megaman">Mega Man</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="metaknight">Meta Knight</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="mewtwo">Mewtwo</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="miibrawler">Mii Brawler</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="miigunner">Mii Gunner</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="miiswordfighter">Mii Swordfighter</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="minmin">Min Min</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="mrgameandwatch">Mr. Game & Watch</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="ness">Ness</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="olimar">Olimar</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="pacman">Pac-Man</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="palutena">Palutena</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="peach">Peach</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="pichu">Pichu</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="pikachu">Pikachu</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="piranhaplant">Piranha Plant</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="pit">Pit</Dropdown.Item>
					    <Dropdown.Item className = "dropdownMenu_item" href="pyra">Pyra</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="richter">Richter</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="ridley">Ridley</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="rob">R.O.B</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="robin">Robin</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="rosalina">Rosalina & Luma</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="roy">Roy</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="samus">Samus</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="sephiroth">Sephiroth</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="sheik">Sheik</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="shulk">Shulk</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="simon">Simon</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="snake">Snake</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="sonic">Sonic</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="steve">Steve</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="terry">Terry</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="toonlink">Toon Link</Dropdown.Item>
					    <Dropdown.Item className = "dropdownMenu_item" href="villager">Villager</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="wario">Wario</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="wiifittrainer">Wii Fit Trainer</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="wolf">Wolf</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="yoshi">Yoshi</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="younglink">Young Link</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="zelda">Zelda</Dropdown.Item>
						<Dropdown.Item className = "dropdownMenu_item" href="zerosuitsamus">Zero Suit Samus</Dropdown.Item>
					</div>
				</DropdownButton>

				<div className = "graph_entriesInput">
					<div className = "graph_entrieswrapper">
						<label className = "graph_entriesInputLabel" >Entries</label>
						<input
							className = "graph_entriesInputBar"
							type="text"
							name = "numOfEntries"
							value = {this.state.numOfEntries}
							onChange={this.handleInputChange}
						/>
					</div>
				</div>

			
				<DropdownButton menuAlign="left" className = "dropdownMenu_state" id="dropdown-basic-button" bsSize = "small" variant="dark" title="States" onSelect={this.handleSelect}>
					<div className = "ddms_wrapper">
						<Dropdown.Item eventKey="">None</Dropdown.Item>
						<Dropdown.Item eventKey="AL">Alabama</Dropdown.Item>
						<Dropdown.Item eventKey="AK">Alaska</Dropdown.Item>
						<Dropdown.Item eventKey="AB">Alberta</Dropdown.Item>
						<Dropdown.Item eventKey="AZ">Arizona</Dropdown.Item>
						<Dropdown.Item eventKey="AR">Arkansas</Dropdown.Item>
						<Dropdown.Item eventKey="BC">British Columbia</Dropdown.Item>
						<Dropdown.Item eventKey="CA">California</Dropdown.Item>
						<Dropdown.Item eventKey="CO">Colorado</Dropdown.Item>
						<Dropdown.Item eventKey="CT">Connecticut</Dropdown.Item>
						<Dropdown.Item eventKey="DC">DC</Dropdown.Item>
						<Dropdown.Item eventKey="DE">Delaware</Dropdown.Item>
						<Dropdown.Item eventKey="FL">Florida</Dropdown.Item>
						<Dropdown.Item eventKey="GA">Georgia</Dropdown.Item>
						<Dropdown.Item eventKey="HI">Hawaii</Dropdown.Item>
						<Dropdown.Item eventKey="ID">Idaho</Dropdown.Item>
						<Dropdown.Item eventKey="IL">Illinois</Dropdown.Item>
						<Dropdown.Item eventKey="IN">Indiana</Dropdown.Item>
						<Dropdown.Item eventKey="IA">Iowa</Dropdown.Item>
						<Dropdown.Item eventKey="KS">Kansas</Dropdown.Item>
						<Dropdown.Item eventKey="KY">Kentucky</Dropdown.Item>
						<Dropdown.Item eventKey="LB">Labrador</Dropdown.Item>
						<Dropdown.Item eventKey="LA">Louisiana</Dropdown.Item>
						<Dropdown.Item eventKey="ME">Maine</Dropdown.Item>
						<Dropdown.Item eventKey="MB">Manitoba</Dropdown.Item>
						<Dropdown.Item eventKey="MD">Maryland</Dropdown.Item>
						<Dropdown.Item eventKey="MA">Massachusetts</Dropdown.Item>
						<Dropdown.Item eventKey="MI">Michigan</Dropdown.Item>
						<Dropdown.Item eventKey="MN">Minnesota</Dropdown.Item>
						<Dropdown.Item eventKey="MS">Mississippi</Dropdown.Item>
						<Dropdown.Item eventKey="MO">Missouri</Dropdown.Item>
						<Dropdown.Item eventKey="MT">Montana</Dropdown.Item>
						<Dropdown.Item eventKey="NE">Nebraska</Dropdown.Item>
						<Dropdown.Item eventKey="NV">Nevada</Dropdown.Item>
						<Dropdown.Item eventKey="NB">New Brunswick</Dropdown.Item>
						<Dropdown.Item eventKey="NF">Newfoundland</Dropdown.Item>
						<Dropdown.Item eventKey="NH">New Hampshire</Dropdown.Item>
						<Dropdown.Item eventKey="NJ">New Jersey</Dropdown.Item>
						<Dropdown.Item eventKey="NM">New Mexico</Dropdown.Item>
						<Dropdown.Item eventKey="NY">New York</Dropdown.Item>
						<Dropdown.Item eventKey="NC">North Carolina</Dropdown.Item>
						<Dropdown.Item eventKey="ND">North Dakota</Dropdown.Item>
						<Dropdown.Item eventKey="NS">Nova Scotia</Dropdown.Item>
						<Dropdown.Item eventKey="NU">Nunavut</Dropdown.Item>
						<Dropdown.Item eventKey="NW">North West Territories</Dropdown.Item>
						<Dropdown.Item eventKey="OH">Ohio</Dropdown.Item>
						<Dropdown.Item eventKey="OK">Oklahoma</Dropdown.Item>
						<Dropdown.Item eventKey="OR">Oregon</Dropdown.Item>
						<Dropdown.Item eventKey="PA">Pennsylvania</Dropdown.Item>
						<Dropdown.Item eventKey="QC">Quebec</Dropdown.Item>
						<Dropdown.Item eventKey="RI">Rhode Island</Dropdown.Item>
						<Dropdown.Item eventKey="SK">Saskatchewen</Dropdown.Item>
						<Dropdown.Item eventKey="SC">South Carolina</Dropdown.Item>
						<Dropdown.Item eventKey="SD">South Dakota</Dropdown.Item>
						<Dropdown.Item eventKey="TN">Tennessee</Dropdown.Item>
						<Dropdown.Item eventKey="TX">Texas</Dropdown.Item>
						<Dropdown.Item eventKey="UT">Utah</Dropdown.Item>
						<Dropdown.Item eventKey="VT">Vermont</Dropdown.Item>
						<Dropdown.Item eventKey="VA">Virginia</Dropdown.Item>
						<Dropdown.Item eventKey="WA">Washington</Dropdown.Item>
						<Dropdown.Item eventKey="WV">West Virginia</Dropdown.Item>
						<Dropdown.Item eventKey="WI">Wisconsin</Dropdown.Item>
						<Dropdown.Item eventKey="WY">Wyoming</Dropdown.Item>
						<Dropdown.Item eventKey="YU">Yukon</Dropdown.Item>

					</div>
				</DropdownButton>

				<DropdownButton menuAlign="left" className = "dropdownMenu_country" id="dropdown-basic-button" variant="dark" title="Country" onSelect={this.handleSelect} >
					<div className = "ddmc_wrapper">
						<Dropdown.Item eventKey="">None</Dropdown.Item>
						<Dropdown.Item eventKey="Brazil">Brazil</Dropdown.Item>
						<Dropdown.Item eventKey="Canada">Canada</Dropdown.Item>
						<Dropdown.Item eventKey="Chile">Chile</Dropdown.Item>
						<Dropdown.Item eventKey="Costa Rica">Costa Rica</Dropdown.Item>
						<Dropdown.Item eventKey="Dominican Republic">Dominican Republic</Dropdown.Item>
						<Dropdown.Item eventKey="El Salvador">El Salvador</Dropdown.Item>
						<Dropdown.Item eventKey="Finland">Finland</Dropdown.Item>
						<Dropdown.Item eventKey="France">France</Dropdown.Item>
						<Dropdown.Item eventKey="Germany">Germany</Dropdown.Item>
						<Dropdown.Item eventKey="Greece">Greece</Dropdown.Item>
						<Dropdown.Item eventKey="Ireland">Ireland</Dropdown.Item>
						<Dropdown.Item eventKey="Mexico">Mexico</Dropdown.Item>
						<Dropdown.Item eventKey="Netherlands">Netherlands</Dropdown.Item>
						<Dropdown.Item eventKey="Peru">Peru</Dropdown.Item>
						<Dropdown.Item eventKey="Serbia">Serbia</Dropdown.Item>
						<Dropdown.Item eventKey="Spain">Spain</Dropdown.Item>
						<Dropdown.Item eventKey="United Kingdom">United Kingdom</Dropdown.Item>
						<Dropdown.Item eventKey="United States">United States</Dropdown.Item>
						<Dropdown.Item eventKey=""></Dropdown.Item>
					</div>
				</DropdownButton>

			</div>

			<div className="graph_info">
				<div className = "graph_title">
					Most active {this.state.characterName} players 
				</div>

				<div className = "graph_title_region">
					{this.state.state}
				</div>
				<div className = "graph_image">
				 <ResponsiveContainer width={'100%'} height={800 * (1 + Math.round((this.state.numOfEntries) / 30))}>
						<BarChart  layout="vertical"  data={this.state.graphData.slice(0,this.state.numOfEntries)} 
							margin={{
								top: 30,
								right: 50,
								left: 150,
								bottom: 30,
							}}>
						  <XAxis type="number" dataKey="value">
								<Label value="Games Played" position="bottom"/>
						  </XAxis>
						  <YAxis type="category" interval={0} dataKey="tag" dx = {0} style={{fontSize: '150%'}}>
								<Label position='left' style={{ textAnchor: 'middle' }} offset={50}>
									Player
								</Label>
						  </YAxis>
						  <Tooltip payload="Hello"/>
						  <Bar dataKey="value" fill="#6761A8">
								<LabelList position="right" />
						  </Bar>
						</BarChart>
				 </ResponsiveContainer>
				</div>
			</div>
		</div>
	}
	
	//Waiting for data
	else {
		return <div className = "waiting">
			<div className = "waiting_title">
				<span className = "waiting_titleText">
					Loading!!!
				</span>
			</div>
		</div>
	}
	}
}