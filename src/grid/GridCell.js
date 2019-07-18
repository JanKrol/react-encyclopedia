import React from 'react';

function GridCell(props) {
	let backgroundImageUrl = `url(https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${props.idString}.png)`
	let categoryClassString1 = `cellCategoryLeft ${props.category1}`
	let categoryClassString2 = `cellCategoryRight ${props.category2}`
	
    return (
		  <div className="grid-item"  onClick={props.onClick}
		  style={{
			  backgroundImage: backgroundImageUrl
			  }}> 
		  <span className="cellNumber">{"#"+props.idString}</span> 
		  <span className="cellTitle">{props.name}</span>
			  <div className="categoryFooter">
				  <span className={categoryClassString1}>{props.category1}</span>
				  {props.category2 && <span className={categoryClassString2}>{props.category2}</span>}
			  </div>
		  </div>
        )
}



export default GridCell;
