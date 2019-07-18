import React from "react";
import ReactDOM from 'react-dom';
import './style.css';
import Grid from './grid/Grid.js';
import { debounce } from "throttle-debounce";
import Modal from './modal/Modal.js';


class App extends React.Component {
  constructor() {
	  super()
	  this.state = {
		  loadedGrids: 0,
		  isLoading: false,
		  modalOpened: false,
		  clickedPokemon: {},
		  name: "",
		  idString: "",
		  height: {},
		  weight: {},
	      category1: "",
	      category2: "",
		  moves: {},
		  stat: {},
	  }
	  this.handleClick = this.handleClick.bind(this)
	  this.capitalize = this.capitalize.bind(this)
	  this.padZeros = this.padZeros.bind(this)
  }
  
  
  
	handleScroll = () => {
		if (this.state.isLoading === false && this.state.loadedGrids > 0){
		if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 250) {
        debounce(500,this.addAdditionalGrid())
		}}
}

	handleClick(j) {
		fetch(`https://pokeapi.co/api/v2/pokemon/${j}/`)
		.then(response => response.json())
		.then(data => {
			
			let name = this.capitalize(data.name)
			let idString = this.padZeros('' + data.id)
			let height = data.height / 10
			let weight = data.weight / 10
			let type1 = data.types[0].type.name
			let type2 = data.types.length > 1 ? data.types[1].type.name : null
			let moves = []
			for (let i = 0; i < data.moves.length; i++) {
				moves.push(data.moves[i].move.name)
			}
			let stats = []
			const maxHeight = 120
			const maxValue = 255
			
			for (let i = 0; i < 6; i++) {
				let result = (data.stats[i].base_stat / maxValue) * maxHeight
				stats.push(result)
			}
			
			this.setState({
				name: name,
				idString: idString,
				height: `${height} m`,
				weight: `${weight} kg`,
				category1: type1,
				category2: type2,
				moves: moves,
				stats: stats,
			    clickedPokemon: j,
			    modalOpened: true,
		})
			})		
		
	}
	
	capitalize(str){
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
	
	padZeros(str){
		return str.padStart(3, '0');
	}
	

	
	toggleModal() {
    this.setState({
      modalOpened: !this.state.modalOpened
    })
  }

    componentDidMount() {
		window.addEventListener("scroll", this.handleScroll);
	}   
	
	componentWillUnmount() {
	window.removeEventListener("scroll", this.handleScroll);
	}
   
    addAdditionalGrid() {
	this.setState({isLoading: true})	
		
	let loadedGrids = this.state.loadedGrids
	  this.setState({
		  loadedGrids: loadedGrids + 1
	  })
	  
	this.setState({isLoading: false})
  }
  
  
  renderAdditionalGrid() {
	  var grids = []
	  for (let i = 1; i < this.state.loadedGrids + 1; i++) {
		grids.push(<Grid key={i} id={i} onClick={this.handleClick}/>)
	}
	return grids
  }	
	
  render() {
    return (
	<>
	  <div id="header"><img src="https://camo.githubusercontent.com/1a4b11888ddf9f2b7a9353d6b69503e634e8704c/68747470733a2f2f692e696d6775722e636f6d2f415975745a4f462e706e67" alt="pokedex logo" height="40px"/></div>
	  <div id="gridDiv" ref="myscroll">
	  <Modal show={this.state.modalOpened} onClose={() => this.toggleModal()} data={this.state}/>
	  <Grid id="0" onClick={this.handleClick}/>
			{(this.state.loadedGrids === 0) && <div className="greyBackground"><button 
			  className="gridButton" 
			  onClick={() => this.addAdditionalGrid()}
			  >
				LOAD MORE
			</button></div>}
	  {this.renderAdditionalGrid()}
	  </div>
	</> 
	  
    );
  }
}



ReactDOM.render(<App />, document.getElementById('root'));
