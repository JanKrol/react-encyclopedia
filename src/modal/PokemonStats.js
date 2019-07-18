import React from 'react';

function PokemonStats(props) {
		
    return (
		 <div className="pokemonStats">
			<h4>Base Stats</h4>
				<div>
					<div className="statContainer">
					<div className="outerBar"><div className="innerBar" style={{
					height: props.data.stats[5]
					}}></div></div>
					HP
					</div>
					
					<div className="statContainer">
					<div className="outerBar"><div className="innerBar" style={{
					height: props.data.stats[4]
					}}></div></div>
					ATTACK
					</div>
					
					<div className="statContainer">
					<div className="outerBar"><div className="innerBar" style={{
					height: props.data.stats[3]
					}}></div></div>
					DEFENSE
					</div>
					
					<div className="statContainer">
					<div className="outerBar"><div className="innerBar" style={{
					height: props.data.stats[2]
					}}></div></div>
					SPECIAL<br />ATTACK
					</div>
					
					<div className="statContainer">
					<div className="outerBar"><div className="innerBar" style={{
					height: props.data.stats[1]
					}}></div></div>
					SPECIAL<br />DEFENSE
					</div>
					
					<div className="statContainer">
					<div className="outerBar"><div className="innerBar" style={{
					height: props.data.stats[0]
					}}></div></div>
					SPEED
					</div>
							
				</div>
		</div>
        )
}



export default PokemonStats;
