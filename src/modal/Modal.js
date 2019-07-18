import React from 'react';
import PokemonMoves from './PokemonMoves.js'
import PokemonStats from './PokemonStats.js'

function Modal(props) {
	if(!props.show) {
      return null;
    }

	let backgroundImageUrl = `url(https://assets.pokemon.com/assets/cms2/img/pokedex/full/${props.data.idString}.png)`
	let categoryClassString1 = `cellCategoryLeftScaled ${props.data.category1}`
	let categoryClassString2 = `cellCategoryRightScaled ${props.data.category2}`
	
    return (
      <div className="backdrop">
	  <div id="header"><img src="https://camo.githubusercontent.com/1a4b11888ddf9f2b7a9353d6b69503e634e8704c/68747470733a2f2f692e696d6775722e636f6d2f415975745a4f462e706e67" alt="pokedex logo" height="40px"/></div>
        <div className="modal">
		<span className="pokemonNumber">{"#"+props.data.idString}</span> 
		<span className="pokemonTitle">{props.data.name}</span>
		<div className="pokemonContent">
			<div>
				<div className="pokemonPicture" style={{backgroundImage: backgroundImageUrl}}>
					<div className="categoryFooter">
					  <span className={categoryClassString1}>{props.data.category1}</span>
					  <span className={categoryClassString2}>{props.data.category2}</span>
				    </div>
				</div>
				<div className="pokemonDetails">
					<div className="pokemonInformation">
						<span className="inline">
						<h5>Height</h5>
						{props.data.height}
						</span>
						<span className="pokemonDetails">
						<h5>Weight</h5>
						{props.data.weight}
						</span>
					</div>
					<PokemonStats data={props.data} />
				</div>
			</div>
		  <PokemonMoves data={props.data} />
		</div>

          <div className="footer">
            <button className="closeButton" onClick={props.onClose}>
              CLOSE
            </button>
          </div>
        </div>
      </div>
    )
}

export default Modal;
