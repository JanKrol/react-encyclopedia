import React from 'react';

function PokemonMoves(props) {
    const moves = []
	props.data.moves.map((value, i) => {
		return (i  < 24) && moves.push(<div key={i} className="movesGridCell">{value}</div>)
	})
	
	return (
		<>
			<span className="title"><h4>Moves</h4></span>
			<div className="movesGrid">
			{moves}
			</div>
		</>	
        )
}



export default PokemonMoves;
