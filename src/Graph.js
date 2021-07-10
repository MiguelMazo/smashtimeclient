import React, { PureComponent } from "react";
import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Label, LabelList, ReferenceLine} from 'recharts';
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
			sliceLength: 0,
			isAnimationActiveFlag: false,
			isPaginated: false,
			page: 1,
			maxPage: 100,
		};

    }

	//Region/State Change
	handleSelect = (event) => {
		this.setState({state: "" + event})
		var newData = [];
		var lengthOfNewSlice = 0;

		this.setState({isAnimationActiveFlag: true});
		//Not ALL
		if ("" + event !== ""){
			for (var i = 0; i < this.state.originalData.length; i++){
				if (this.state.originalData[i].state === "" + event || this.state.originalData[i].country === "" + event){
					newData.push(this.state.originalData[i]);
					lengthOfNewSlice++;
				}
			}
			// If the desired number is too high, make it the max length possible
			if (10 > newData.length){
				this.setState({numOfEntries: newData.length})
			}

			else {
				this.setState({numOfEntries: 10});
			}

			this.setState({sliceLength: lengthOfNewSlice});
			this.setState({maxPage: Math.ceil(newData.length / this.state.numOFEntries)});
			this.setState({graphData: newData});
		}
		
		//Is ALL
		else{
			this.setState({graphData: this.state.originalData});
			if ("" + event == ""){
				this.setState({numOfEntries: 10})
			}
			else if (this.state.numOfEntries > newData.length){
				this.setState({numOfEntries: this.state.originalData.length})
			}
			this.setState({sliceLength: this.state.maxEntries});
			this.setState({maxPage: Math.ceil(this.state.maxEntries / this.state.numOfEntries)});
		}
	}

	//Number of entries change
	handleInputChange = (event) => {
		event.preventDefault()
		this.setState({isAnimationActiveFlag: true});
		if (event.target.value == ""){
			event.target.value = "1";
		}
		if (parseInt(event.target.value) > this.state.maxEntries){
			this.setState({
				[event.target.name]: this.state.maxEntries
			})
		}
		else {
			this.setState({
				[event.target.name]: parseInt(event.target.value)
			})
		}

		this.setState({maxPage: Math.ceil(this.state.maxEntries / parseInt(event.target.value))});
	}

	//Handle Next Page for Pagination
	handleNext = (event) => {
		event.preventDefault()
		if (this.state.isPaginated){
			if (this.state.page < this.state.maxPage){
				this.setState({page: this.state.page += 1});
			}
			this.forceUpdate();
		}
	}

	//Handle Back Page for Pagination
	handleBack = () => {
		if (this.state.isPaginated){
			if (this.state.page > 1){
				this.setState({page: this.state.page -= 1});
			}
			this.forceUpdate();
		}
	}

	handlePagination = () => {
		if (this.state.isPaginated){
			this.setState({isPaginated: false});
		}

		else {
			this.setState({isPaginated: true});
		}
		this.setState({page: 1});
		this.forceUpdate();

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

        Axios.get("https://smashti.me/api" + '/testAPI/?query=' + charName).then((response) => {
            this.setState({apiResponse: response.data})
			var data = [];
			for (var i = 0; i < this.state.apiResponse.length; i++){
				var dataObject = {
					tag: this.state.apiResponse[i].tag,
					Games: this.state.apiResponse[i].gameCount,
					state: this.state.apiResponse[i].state,
					country: this.state.apiResponse[i].country, 
				}
				data.push(dataObject);
			}
			this.setState({maxEntries: this.state.apiResponse.length});
			this.setState({sliceLength: this.state.maxEntries});
			this.setState({maxPage: Math.ceil(this.state.maxEntries / 10)});
			if (this.state.numOfEntries < 10 && this.state.maxEntries >= 10){
				this.setState({numOfEntries: 10});
			}
			this.setState({graphData: data});
			this.setState({originalData: data});
        });
    }

	render(){

	//Data is here Paginated 
	if (this.state.apiResponse[0] && this.state.apiResponse[0].tag && this.state.isPaginated === true){
		return <div className = "graph">
			<div className = "graph_interface_wrapper">
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

					<div className="regionWrapper">
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
								<Dropdown.Item eventKey="Afghanistan">Afghanistan</Dropdown.Item>
								<Dropdown.Item eventKey="Algeria">Algeria</Dropdown.Item>
								<Dropdown.Item eventKey="Antarctica">Antarctica</Dropdown.Item>
								<Dropdown.Item eventKey="Argentina">Argentina</Dropdown.Item>
								<Dropdown.Item eventKey="Armenia">Armenia</Dropdown.Item>
								<Dropdown.Item eventKey="Aruba">Aruba</Dropdown.Item>
								<Dropdown.Item eventKey="Australia">Australia</Dropdown.Item>
								<Dropdown.Item eventKey="Austria">Austria</Dropdown.Item>
								<Dropdown.Item eventKey="Bahamas">Bahamas</Dropdown.Item>
								<Dropdown.Item eventKey="Bahrain">Bahrain</Dropdown.Item>
								<Dropdown.Item eventKey="Bangladesh">Bangladesh</Dropdown.Item>
								<Dropdown.Item eventKey="Barbados">Barbados</Dropdown.Item>
								<Dropdown.Item eventKey="Belgium">Belgium</Dropdown.Item>
								<Dropdown.Item eventKey="Bermuda">Bermuda</Dropdown.Item>
								<Dropdown.Item eventKey="Bolivia">Bolivia</Dropdown.Item>
								<Dropdown.Item eventKey="Brazil">Brazil</Dropdown.Item>
								<Dropdown.Item eventKey="British Indian Ocean Territory">British Indian Ocean Territory</Dropdown.Item>
								<Dropdown.Item eventKey="Brunei">Brunei</Dropdown.Item>
								<Dropdown.Item eventKey="Canada">Canada</Dropdown.Item>
								<Dropdown.Item eventKey="Cayman Islands">Cayman Islands</Dropdown.Item>
								<Dropdown.Item eventKey="Chad">Chad</Dropdown.Item>
								<Dropdown.Item eventKey="Chile">Chile</Dropdown.Item>
								<Dropdown.Item eventKey="China">China</Dropdown.Item>
								<Dropdown.Item eventKey="Colombia">Colombia</Dropdown.Item>
								<Dropdown.Item eventKey="Costa Rica">Costa Rica</Dropdown.Item>
								<Dropdown.Item eventKey="Cyprus">Cyprus</Dropdown.Item>
								<Dropdown.Item eventKey="Czech Republic">Czech Republic</Dropdown.Item>
								<Dropdown.Item eventKey="Denmark">Denmark</Dropdown.Item>
								<Dropdown.Item eventKey="Dominican Republic">Dominican Republic</Dropdown.Item>
								<Dropdown.Item eventKey="DR Congo">DR Congo</Dropdown.Item>
								<Dropdown.Item eventKey="Ecuador">Ecuador</Dropdown.Item>
								<Dropdown.Item eventKey="Egypt">Egypt</Dropdown.Item>
								<Dropdown.Item eventKey="El Salvador">El Salvador</Dropdown.Item>
								<Dropdown.Item eventKey="England">England</Dropdown.Item>
								<Dropdown.Item eventKey="Faroe Islands">Faroe Islands</Dropdown.Item>
								<Dropdown.Item eventKey="Fiji">Fiji</Dropdown.Item>
								<Dropdown.Item eventKey="Finland">Finland</Dropdown.Item>
								<Dropdown.Item eventKey="France">France</Dropdown.Item>
								<Dropdown.Item eventKey="French Guiana">French Guiana</Dropdown.Item>
								<Dropdown.Item eventKey="Germany">Germany</Dropdown.Item>
								<Dropdown.Item eventKey="Georgia">Georgia</Dropdown.Item>
								<Dropdown.Item eventKey="Ghana">Ghana</Dropdown.Item>
								<Dropdown.Item eventKey="Greece">Greece</Dropdown.Item>
								<Dropdown.Item eventKey="Guam">Guam</Dropdown.Item>
								<Dropdown.Item eventKey="Guatemala">Guatemala</Dropdown.Item>
								<Dropdown.Item eventKey="Honduras">Honduras</Dropdown.Item>
								<Dropdown.Item eventKey="Hong Kong">Hong Kong</Dropdown.Item>
								<Dropdown.Item eventKey="Hungary">Hungary</Dropdown.Item>
								<Dropdown.Item eventKey="Iceland">Iceland</Dropdown.Item>
								<Dropdown.Item eventKey="India">India</Dropdown.Item>
								<Dropdown.Item eventKey="Indonesia">Indonesia</Dropdown.Item>
								<Dropdown.Item eventKey="Ireland">Ireland</Dropdown.Item>
								<Dropdown.Item eventKey="Isle of Man">Isle of Man</Dropdown.Item>
								<Dropdown.Item eventKey="Isreal">Isreal</Dropdown.Item>
								<Dropdown.Item eventKey="Italy">Italy</Dropdown.Item>
								<Dropdown.Item eventKey="Jamaica">Jamaica</Dropdown.Item>
								<Dropdown.Item eventKey="Japan">Japan</Dropdown.Item>
								<Dropdown.Item eventKey="Kazakhstan">Kazakhstan</Dropdown.Item>
								<Dropdown.Item eventKey="Kuwait">Kuwait</Dropdown.Item>
								<Dropdown.Item eventKey="Latvia">Latvia</Dropdown.Item>
								<Dropdown.Item eventKey="Lebanon">Lebanon</Dropdown.Item>
								<Dropdown.Item eventKey="Lithuania">Lithuania</Dropdown.Item>
								<Dropdown.Item eventKey="Luxembourg">Luxembourg</Dropdown.Item>
								<Dropdown.Item eventKey="Macedonia">Macedonia</Dropdown.Item>
								<Dropdown.Item eventKey="Malaysia">Malaysia</Dropdown.Item>
								<Dropdown.Item eventKey="Malta">Malta</Dropdown.Item>
								<Dropdown.Item eventKey="Mexico">Mexico</Dropdown.Item>
								<Dropdown.Item eventKey="Morocco">Morocco</Dropdown.Item>
								<Dropdown.Item eventKey="Netherlands">Netherlands</Dropdown.Item>
								<Dropdown.Item eventKey="New Zealand">New Zealand</Dropdown.Item>
								<Dropdown.Item eventKey="Nicuragua">Nicuragua</Dropdown.Item>
								<Dropdown.Item eventKey="Norway">Norway</Dropdown.Item>
								<Dropdown.Item eventKey="Pakistan">Pakistan</Dropdown.Item>
								<Dropdown.Item eventKey="Panama">Panama</Dropdown.Item>
								<Dropdown.Item eventKey="Paraguay">Paraguay</Dropdown.Item>
								<Dropdown.Item eventKey="Peru">Peru</Dropdown.Item>
								<Dropdown.Item eventKey="Philippines">Philippines</Dropdown.Item>
								<Dropdown.Item eventKey="Poland">Poland</Dropdown.Item>
								<Dropdown.Item eventKey="Portugal">Portugal</Dropdown.Item>
								<Dropdown.Item eventKey="Puerto Rico">Puerto Rico</Dropdown.Item>
								<Dropdown.Item eventKey="Qatar">Qatar</Dropdown.Item>
								<Dropdown.Item eventKey="Romania">Romania</Dropdown.Item>
								<Dropdown.Item eventKey="Russia">Russia</Dropdown.Item>
								<Dropdown.Item eventKey="San Marino">San Marino</Dropdown.Item>
								<Dropdown.Item eventKey="Saudi Arabia">Saudi Arabia</Dropdown.Item>
								<Dropdown.Item eventKey="Scotland">Scotland</Dropdown.Item>
								<Dropdown.Item eventKey="Serbia">Serbia</Dropdown.Item>
								<Dropdown.Item eventKey="Singapore">Singapore</Dropdown.Item>
								<Dropdown.Item eventKey="South Korea">South Korea</Dropdown.Item>
								<Dropdown.Item eventKey="South Sudan">South Sudan</Dropdown.Item>
								<Dropdown.Item eventKey="Spain">Spain</Dropdown.Item>
								<Dropdown.Item eventKey="Sweden">Sweden</Dropdown.Item>
								<Dropdown.Item eventKey="Switzerland">Switzerland</Dropdown.Item>
								<Dropdown.Item eventKey="Taiwan">Taiwan</Dropdown.Item>
								<Dropdown.Item eventKey="Thailand">Thailand</Dropdown.Item>
								<Dropdown.Item eventKey="Trinidad and Tobago">Trinidad and Tobago</Dropdown.Item>
								<Dropdown.Item eventKey="Turkey">Turkey</Dropdown.Item>
								<Dropdown.Item eventKey="Uganda">Uganda</Dropdown.Item>
								<Dropdown.Item eventKey="Ukraine">Ukraine</Dropdown.Item>
								<Dropdown.Item eventKey="United Arab Emirates">United Arab Emirates</Dropdown.Item>
								<Dropdown.Item eventKey="United Kingdom">United Kingdom</Dropdown.Item>
								<Dropdown.Item eventKey="United States">United States</Dropdown.Item>
								<Dropdown.Item eventKey="United States Minor Outlying Islands">United States Minor Outlying Islands</Dropdown.Item>
								<Dropdown.Item eventKey="United States Virgin Islands">United States Virgin Islands</Dropdown.Item>
								<Dropdown.Item eventKey="Uruguay">Uruguay</Dropdown.Item>
								<Dropdown.Item eventKey="Uzbekistan">Uzbekistan</Dropdown.Item>
								<Dropdown.Item eventKey="Vietnam">Vietnam</Dropdown.Item>
								<Dropdown.Item eventKey="Venezuela">Venezuela</Dropdown.Item>
								<Dropdown.Item eventKey="Wales">Wales</Dropdown.Item>
							</div>
						</DropdownButton>
					</div>

					<div className = "paginationCheckmark">
						<div className = "toggleText">
							Pagination
						</div>
						<input className = "checkbox" type="checkbox" onChange={this.handlePagination}>

						</input>
					</div>
				</div>

				<div className = "buttonWrapper">
						<button className = "nextButton" onClick={this.handleNext}> 
								Next
						</button>

						<button className = "backButton" onClick={this.handleBack}> 
								Back
						</button>
				</div>

			</div>

			<div className="graph_info">
				<div className = "graph_title">
					Most active {this.state.characterName} players 
				</div>

				<div className = "graph_title_region">
					{this.state.state}
				</div>

				<div className = "graph_title_maxEntrants">
							Max Entries: {this.state.sliceLength}
				</div>

				<div className = "graph_title_pageNum">
							Page:  {this.state.page} / {this.state.maxPage}
				</div>
				<div className = "graph_image">
				 <ResponsiveContainer width={'100%'} height={750}>
						<BarChart  layout="vertical"  data={this.state.graphData.slice(this.state.numOfEntries * (this.state.page - 1), this.state.numOfEntries * (this.state.page - 1) + this.state.numOfEntries)} 
							margin={{
								top: 30,
								right: 50,
								left: 150,
								bottom: 30,
							}}>

						  <XAxis type="number" dataKey="Games" axisLine={true} orientation="top">
								<Label value="Games Played" position="top"/>
						  </XAxis>
						  <YAxis type="category" interval={0} dataKey="tag" dx = {0} style={{fontSize: '150%'}}/>
						  <Tooltip payload="Hello"/>
						  <Bar isAnimationActive={this.state.isAnimationActiveFlag} dataKey="Games" fill="#6761A8">
								<LabelList position="right" />
						  </Bar>

						  <ReferenceLine y="this.state.graphData[0].tag" label="Games Played" stroke="green"/>

						</BarChart>
				 </ResponsiveContainer>
				</div>
			</div>
		</div>
	}

	//Data is here Unpaginated
	else if (this.state.apiResponse[0] && this.state.apiResponse[0].tag  && this.state.isPaginated === false){
		return <div className = "graph">

			<div className = "graph_interface_wrapper">
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

					<div className="regionWrapper">
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
								<Dropdown.Item eventKey="Afghanistan">Afghanistan</Dropdown.Item>
								<Dropdown.Item eventKey="Algeria">Algeria</Dropdown.Item>
								<Dropdown.Item eventKey="Antarctica">Antarctica</Dropdown.Item>
								<Dropdown.Item eventKey="Argentina">Argentina</Dropdown.Item>
								<Dropdown.Item eventKey="Armenia">Armenia</Dropdown.Item>
								<Dropdown.Item eventKey="Aruba">Aruba</Dropdown.Item>
								<Dropdown.Item eventKey="Australia">Australia</Dropdown.Item>
								<Dropdown.Item eventKey="Austria">Austria</Dropdown.Item>
								<Dropdown.Item eventKey="Bahamas">Bahamas</Dropdown.Item>
								<Dropdown.Item eventKey="Bahrain">Bahrain</Dropdown.Item>
								<Dropdown.Item eventKey="Bangladesh">Bangladesh</Dropdown.Item>
								<Dropdown.Item eventKey="Barbados">Barbados</Dropdown.Item>
								<Dropdown.Item eventKey="Belgium">Belgium</Dropdown.Item>
								<Dropdown.Item eventKey="Bermuda">Bermuda</Dropdown.Item>
								<Dropdown.Item eventKey="Bolivia">Bolivia</Dropdown.Item>
								<Dropdown.Item eventKey="Brazil">Brazil</Dropdown.Item>
								<Dropdown.Item eventKey="British Indian Ocean Territory">British Indian Ocean Territory</Dropdown.Item>
								<Dropdown.Item eventKey="Brunei">Brunei</Dropdown.Item>
								<Dropdown.Item eventKey="Canada">Canada</Dropdown.Item>
								<Dropdown.Item eventKey="Cayman Islands">Cayman Islands</Dropdown.Item>
								<Dropdown.Item eventKey="Chad">Chad</Dropdown.Item>
								<Dropdown.Item eventKey="Chile">Chile</Dropdown.Item>
								<Dropdown.Item eventKey="China">China</Dropdown.Item>
								<Dropdown.Item eventKey="Colombia">Colombia</Dropdown.Item>
								<Dropdown.Item eventKey="Costa Rica">Costa Rica</Dropdown.Item>
								<Dropdown.Item eventKey="Cyprus">Cyprus</Dropdown.Item>
								<Dropdown.Item eventKey="Czech Republic">Czech Republic</Dropdown.Item>
								<Dropdown.Item eventKey="Denmark">Denmark</Dropdown.Item>
								<Dropdown.Item eventKey="Dominican Republic">Dominican Republic</Dropdown.Item>
								<Dropdown.Item eventKey="DR Congo">DR Congo</Dropdown.Item>
								<Dropdown.Item eventKey="Ecuador">Ecuador</Dropdown.Item>
								<Dropdown.Item eventKey="Egypt">Egypt</Dropdown.Item>
								<Dropdown.Item eventKey="El Salvador">El Salvador</Dropdown.Item>
								<Dropdown.Item eventKey="England">England</Dropdown.Item>
								<Dropdown.Item eventKey="Faroe Islands">Faroe Islands</Dropdown.Item>
								<Dropdown.Item eventKey="Fiji">Fiji</Dropdown.Item>
								<Dropdown.Item eventKey="Finland">Finland</Dropdown.Item>
								<Dropdown.Item eventKey="France">France</Dropdown.Item>
								<Dropdown.Item eventKey="French Guiana">French Guiana</Dropdown.Item>
								<Dropdown.Item eventKey="Germany">Germany</Dropdown.Item>
								<Dropdown.Item eventKey="Georgia">Georgia</Dropdown.Item>
								<Dropdown.Item eventKey="Ghana">Ghana</Dropdown.Item>
								<Dropdown.Item eventKey="Greece">Greece</Dropdown.Item>
								<Dropdown.Item eventKey="Guam">Guam</Dropdown.Item>
								<Dropdown.Item eventKey="Guatemala">Guatemala</Dropdown.Item>
								<Dropdown.Item eventKey="Honduras">Honduras</Dropdown.Item>
								<Dropdown.Item eventKey="Hong Kong">Hong Kong</Dropdown.Item>
								<Dropdown.Item eventKey="Hungary">Hungary</Dropdown.Item>
								<Dropdown.Item eventKey="Iceland">Iceland</Dropdown.Item>
								<Dropdown.Item eventKey="India">India</Dropdown.Item>
								<Dropdown.Item eventKey="Indonesia">Indonesia</Dropdown.Item>
								<Dropdown.Item eventKey="Ireland">Ireland</Dropdown.Item>
								<Dropdown.Item eventKey="Isle of Man">Isle of Man</Dropdown.Item>
								<Dropdown.Item eventKey="Isreal">Isreal</Dropdown.Item>
								<Dropdown.Item eventKey="Italy">Italy</Dropdown.Item>
								<Dropdown.Item eventKey="Jamaica">Jamaica</Dropdown.Item>
								<Dropdown.Item eventKey="Japan">Japan</Dropdown.Item>
								<Dropdown.Item eventKey="Kazakhstan">Kazakhstan</Dropdown.Item>
								<Dropdown.Item eventKey="Kuwait">Kuwait</Dropdown.Item>
								<Dropdown.Item eventKey="Latvia">Latvia</Dropdown.Item>
								<Dropdown.Item eventKey="Lebanon">Lebanon</Dropdown.Item>
								<Dropdown.Item eventKey="Lithuania">Lithuania</Dropdown.Item>
								<Dropdown.Item eventKey="Luxembourg">Luxembourg</Dropdown.Item>
								<Dropdown.Item eventKey="Macedonia">Macedonia</Dropdown.Item>
								<Dropdown.Item eventKey="Malaysia">Malaysia</Dropdown.Item>
								<Dropdown.Item eventKey="Malta">Malta</Dropdown.Item>
								<Dropdown.Item eventKey="Mexico">Mexico</Dropdown.Item>
								<Dropdown.Item eventKey="Morocco">Morocco</Dropdown.Item>
								<Dropdown.Item eventKey="Netherlands">Netherlands</Dropdown.Item>
								<Dropdown.Item eventKey="New Zealand">New Zealand</Dropdown.Item>
								<Dropdown.Item eventKey="Nicuragua">Nicuragua</Dropdown.Item>
								<Dropdown.Item eventKey="Norway">Norway</Dropdown.Item>
								<Dropdown.Item eventKey="Pakistan">Pakistan</Dropdown.Item>
								<Dropdown.Item eventKey="Panama">Panama</Dropdown.Item>
								<Dropdown.Item eventKey="Paraguay">Paraguay</Dropdown.Item>
								<Dropdown.Item eventKey="Peru">Peru</Dropdown.Item>
								<Dropdown.Item eventKey="Philippines">Philippines</Dropdown.Item>
								<Dropdown.Item eventKey="Poland">Poland</Dropdown.Item>
								<Dropdown.Item eventKey="Portugal">Portugal</Dropdown.Item>
								<Dropdown.Item eventKey="Puerto Rico">Puerto Rico</Dropdown.Item>
								<Dropdown.Item eventKey="Qatar">Qatar</Dropdown.Item>
								<Dropdown.Item eventKey="Romania">Romania</Dropdown.Item>
								<Dropdown.Item eventKey="Russia">Russia</Dropdown.Item>
								<Dropdown.Item eventKey="San Marino">San Marino</Dropdown.Item>
								<Dropdown.Item eventKey="Saudi Arabia">Saudi Arabia</Dropdown.Item>
								<Dropdown.Item eventKey="Scotland">Scotland</Dropdown.Item>
								<Dropdown.Item eventKey="Serbia">Serbia</Dropdown.Item>
								<Dropdown.Item eventKey="Singapore">Singapore</Dropdown.Item>
								<Dropdown.Item eventKey="South Korea">South Korea</Dropdown.Item>
								<Dropdown.Item eventKey="South Sudan">South Sudan</Dropdown.Item>
								<Dropdown.Item eventKey="Spain">Spain</Dropdown.Item>
								<Dropdown.Item eventKey="Sweden">Sweden</Dropdown.Item>
								<Dropdown.Item eventKey="Switzerland">Switzerland</Dropdown.Item>
								<Dropdown.Item eventKey="Taiwan">Taiwan</Dropdown.Item>
								<Dropdown.Item eventKey="Thailand">Thailand</Dropdown.Item>
								<Dropdown.Item eventKey="Trinidad and Tobago">Trinidad and Tobago</Dropdown.Item>
								<Dropdown.Item eventKey="Turkey">Turkey</Dropdown.Item>
								<Dropdown.Item eventKey="Uganda">Uganda</Dropdown.Item>
								<Dropdown.Item eventKey="Ukraine">Ukraine</Dropdown.Item>
								<Dropdown.Item eventKey="United Arab Emirates">United Arab Emirates</Dropdown.Item>
								<Dropdown.Item eventKey="United Kingdom">United Kingdom</Dropdown.Item>
								<Dropdown.Item eventKey="United States">United States</Dropdown.Item>
								<Dropdown.Item eventKey="United States Minor Outlying Islands">United States Minor Outlying Islands</Dropdown.Item>
								<Dropdown.Item eventKey="United States Virgin Islands">United States Virgin Islands</Dropdown.Item>
								<Dropdown.Item eventKey="Uruguay">Uruguay</Dropdown.Item>
								<Dropdown.Item eventKey="Uzbekistan">Uzbekistan</Dropdown.Item>
								<Dropdown.Item eventKey="Vietnam">Vietnam</Dropdown.Item>
								<Dropdown.Item eventKey="Venezuela">Venezuela</Dropdown.Item>
								<Dropdown.Item eventKey="Wales">Wales</Dropdown.Item>
							</div>
						</DropdownButton>
					</div>

					<div className = "paginationCheckmark">
						<div className = "toggleText">
							Pagination
						</div>
						<input className = "checkbox" type="checkbox" onChange={this.handlePagination}>

						</input>
					</div>
				</div>

				<div className = "buttonWrapper">
						<button className = "nextButton" onClick={this.handleNext} style={{display: 'none'}}> 
								Next
						</button>

						<button className = "backButton" onClick={this.handleBack} style={{display: 'none'}}> 
								Back
						</button>
				</div>
			</div>
			<div className="graph_info">
				<div className = "graph_title">
					Most active {this.state.characterName} players 
				</div>

				<div className = "graph_title_region">
					{this.state.state}
				</div>

				<div className = "graph_title_maxEntrants">
							Max Entries: {this.state.sliceLength}
				</div>

				<div className = "graph_title_pageNum" style={{display: 'none'}}>
							Page:  {this.state.page} / {this.state.maxPage}
				</div>
				<div className = "graph_image">
				 <ResponsiveContainer width={'100%'} height={750 * (1 + Math.round((this.state.numOfEntries) / 30))}>
						<BarChart  layout="vertical"  data={this.state.graphData.slice(0,this.state.numOfEntries)} 
							margin={{
								top: 30,
								right: 50,
								left: 150,
								bottom: 30,
							}}>

						  <XAxis type="number" dataKey="Games" axisLine={true} orientation="top">
								<Label value="Games Played" position="top"/>
						  </XAxis>
						  <YAxis type="category" interval={0} dataKey="tag" dx = {0} style={{fontSize: '150%'}}/>
						  <Tooltip payload="Hello"/>
						  <Bar isAnimationActive={this.state.isAnimationActiveFlag} dataKey="Games" fill="#6761A8">
								<LabelList position="right" />
						  </Bar>

						  <ReferenceLine y="this.state.graphData[0].tag" label="Games Played" stroke="green"/>

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
					<img
						className = "header_logo"
						src='https://cdn.discordapp.com/attachments/485919122404933634/862518739295010816/loading.gif' 
					/>
				</span>
			</div>
		</div>
	}
	}
}