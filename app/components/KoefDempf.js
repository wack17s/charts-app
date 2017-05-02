// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import styles from './KoefDempf.css';

class KoefDempf extends Component {
	 constructor(props) {
    super(props);
    this.state = {
    	a: {
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
    	m: 1.09,
    	h: 10.5,
    	row: "a",
    	column: 'k',
    	ready: false
    };
  }

  componentDidMount() {
  	this.getK();
  }

  getK = () => {
  	const k = {};

  	const dictionary = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

  	for (let i = 1; i <= 10; i++) {
  		k[dictionary[i]] = Math.round(2 * this.state.m * this.state.a[dictionary[i]] * this.state.a[dictionary[i]] *
  			this.state.a[dictionary[i]] * this.state.b[dictionary[i]] *
  			this.state.b[dictionary[i]] * this.state.b[dictionary[i]] /
  			(this.state.h * this.state.h * this.state.h * 
  			(this.state.a[dictionary[i]] * this.state.a[dictionary[i]] + this.state.b[dictionary[i]] * this.state.b[dictionary[i]])) * 1000) / 1000;
  	}

  	this.setState({ k, ready: true });
  }

  prepareChartData = () => {
  	const dictionary = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

  	const res = [];

  	for (let i = 1; i <= 10; i++) {
  		res.push({ row: this.state[this.state.row][dictionary[i]], column: this.state[this.state.column][dictionary[i]] });
  	}

  	return res;
  }

  onAfterSaveCell = (row, cellName, cellValue) => {
	  alert(`Save cell ${cellName} with value ${cellValue}`);

	  const rowStr = {};
	  for (const prop in row) {
	  	if (prop !== "label") {
	    	rowStr[prop] = parseInt(row[prop]);
	    }
	  }

	  this.setState({ [row.label]: { ...rowStr } }, () => this.getK());
	}

   render() {
   	const products = [{
	      label: "a",
	      ...this.state.a
	  }, {
	      label: "b",
	      ...this.state.b
	  }, {
	  		label: "k",
	      ...this.state.k
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
	      m(мю) = <input type="text" value={this.state.m} />
	      <p />
	      h = <input type="text" value={this.state.h} />
	      <p />

	     	{this.state.ready
	     		? (<LineChart width={600} height={300} data={this.prepareChartData()}
		        	margin={{top: 5, right: 30, left: 20, bottom: 5}}>
			       <XAxis dataKey="row"/>
			       <YAxis/>
			       <CartesianGrid strokeDasharray="3 3"/>
			       <Tooltip/>
			       <Legend />
			       <Line type="monotone" dataKey="row" stroke="#8884d8" activeDot={{r: 8}}/>
			       <Line type="monotone" dataKey="column" stroke="#82ca9d" />
			      </LineChart>)
	     		: null}
	     </div>
    );
  }
}

export default KoefDempf;
