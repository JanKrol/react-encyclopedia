import React from 'react';
import update from 'immutability-helper';
import './Grid.css';
import GridCell from './GridCell.js'

class Grid extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			pokemons: Array(12).fill({
				name: "",
				id: "loading...",
				category1: null,
				category2: null,
			})
		}
	}
	
	componentDidMount() {
		let pokemonRangeStart = this.props.id * 12
		let pokemonRangeEnd = pokemonRangeStart + 12
		
		for (let i = pokemonRangeStart; i < pokemonRangeEnd; i++) {
		fetch(`https://pokeapi.co/api/v2/pokemon/${i+1}/`)
		.then(response => response.json())
		.then(data => {
			let fetchedPokemon = this.state.pokemons
			let name = data.name
			let type1 = data.types[0].type.name
			let type2 = data.types.length > 1 ? data.types[1].type.name : null
			fetchedPokemon = update(fetchedPokemon, {[i-pokemonRangeStart]: {name: {$set: name}}})
			fetchedPokemon = update(fetchedPokemon, {[i-pokemonRangeStart]: {id: {$set: i+1}}})
			fetchedPokemon = update(fetchedPokemon, {[i-pokemonRangeStart]: {category1: {$set: type1}}})
			fetchedPokemon = update(fetchedPokemon, {[i-pokemonRangeStart]: {category2: {$set: type2}}})			
			this.setState({
					pokemons:  fetchedPokemon
                })
		})
		}		
	}
	
	capitalize(str){
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
	
	padZeros(str){
		return str.padStart(3, '0');
	}
	

	renderPokemons = () => {
		let pokemons = []
				this.state && this.state.pokemons && this.state.pokemons.map((pokemon, i) => {
						return pokemons.push(
							<GridCell
								key={i}
								name={this.capitalize(pokemon.name)}
								idString={this.padZeros('' + pokemon.id)}
								category1={pokemon.category1}
								category2={pokemon.category2}
								onClick={() => this.props.onClick(pokemon.id)}
							/>
						)
					}
				)
		return pokemons		
	}
	
		render() {
			return (
			   <div className="grid-container">
				{this.renderPokemons()}
				</div> 
			)
		}
		}



export default Grid;
