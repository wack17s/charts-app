// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import styles from './KoefDempf.css';

class KoefDempf extends Component {
	 constructor(props) {
    super(props);
    this.state = {
    	a: {
	      label: "a",
    		one: 1,
	      two: 2,
	      three: 3,
	      four: 4,
	      five: 5,
	      six: 6,
	      seven: 7,
	      eight: 8,
	      nine: 9,
	      ten: 10
    	},
    	b: {
	      label: "b",
    		one: 1,
	      two: 2,
	      three: 3,
	      four: 4,
	      five: 5,
	      six: 6,
	      seven: 7,
	      eight: 8,
	      nine: 9,
	      ten: 10
    	}
    };
  }

  onAfterSaveCell = (row, cellName, cellValue) => {
	  alert(`Save cell ${cellName} with value ${cellValue}`);

	  const rowStr = {};
	  for (const prop in row) {
	    rowStr[prop] = row[prop];
	  }

	  this.setState({ [rowStr.label]: { ...rowStr } });
	}

   render() {
   	const products = [{
	      ...this.state.a
	  }, {
	      ...this.state.b
	  }];

	  const cellEditProp = {
		  mode: 'click',
		  blurToSave: true,
		  afterSaveCell: this.onAfterSaveCell
		};

    return (
    	<div>
	      <BootstrapTable data={ products } cellEdit={ cellEditProp }>
	          <TableHeaderColumn dataField='label' isKey>Параметр</TableHeaderColumn>
	          <TableHeaderColumn dataField='one'>1</TableHeaderColumn>
	          <TableHeaderColumn dataField='two'>2</TableHeaderColumn>
	          <TableHeaderColumn dataField='three'>3</TableHeaderColumn>
	          <TableHeaderColumn dataField='four'>4</TableHeaderColumn>
	          <TableHeaderColumn dataField='five'>5</TableHeaderColumn>
	          <TableHeaderColumn dataField='six'>6</TableHeaderColumn>
	          <TableHeaderColumn dataField='seven'>7</TableHeaderColumn>
	          <TableHeaderColumn dataField='eight'>8</TableHeaderColumn>
	          <TableHeaderColumn dataField='nine'>9</TableHeaderColumn>
	          <TableHeaderColumn dataField='ten'>10</TableHeaderColumn>
	      </BootstrapTable>
	      <p />
	      	      m(мю) = <input type="text" value={2} />
	      <p />
	      h = <input type="text" value={10} />
	     </div>
    );
  }
}

export default KoefDempf;
