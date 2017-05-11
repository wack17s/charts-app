// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { RadioGroup, RadioButton } from 'react-radio-buttons';

import styles from './KoefDempf.css';
import './react-bootstrap-table-all.min.css';

class KoefDempf extends Component {
	 constructor(props) {
    super(props);
    this.state = {
    	type: 'rectangle',
    	a: {
    		one: 0.0075,
	      two: 0.008,
	      three: 0.0085,
	      four: 0.009,
	      five: 0.00948,
	      six: 0.01,
	      seven: 0.015,
	      eight: 0.02,
	      nine: 0.025,
	      ten: 0.03
    	},
    	b: {
    		one: 0.008,
	      two: 0.0085,
	      three: 0.009,
	      four: 0.0095,
	      five: 0.01,
	      six: 0.015,
	      seven: 0.02,
	      eight: 0.025,
	      nine: 0.03,
	      ten: 0.035
    	},
    	R: {
    		one: 0.0035,
	      two: 0.004,
	      three: 0.0045,
	      four: 0.005,
	      five: 0.00535,
	      six: 0.006,
	      seven: 0.0065,
	      eight: 0.007,
	      nine: 0.0075,
	      ten: 0.008
    	},
    	m: 0.000017,
    	h: 0.000018,
    	midm: 0.000017,
    	midh: 0.000018,
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
  	const { a, b, h, m, R, type } = this.state;

  	const dictionary = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

  	for (let i = 1; i <= 10; i++) {
  		if (type === 'rectangle') {
	  		k[dictionary[i]] = Math.round(2 * m * a[dictionary[i]] * b[dictionary[i]] *
	  			b[dictionary[i]] * b[dictionary[i]] / (h * h * h) * 10000) / 10000;
	  	};

	  	if (type === 'square') {
	  		k[dictionary[i]] = Math.round(m * a[dictionary[i]] * a[dictionary[i]] * a[dictionary[i]] * a[dictionary[i]] /
	  			(h * h * h) * 10000) / 10000;
	  	};

	  	if (type === 'circle') {
	  		k[dictionary[i]] = Math.round(3 * m * Math.PI * R[dictionary[i]] * R[dictionary[i]] * R[dictionary[i]] * R[dictionary[i]] /
	  			(h * h * h) * 10000) / 10000;
	  	}
  	}

  	this.setState({ k, ready: true });
  }

  prepareChartData = () => {
  	const { type } = this.state;
  	const dictionary = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

  	const res = [ null ];

  	for (let i = 1; i <= 10; i++) {
  		if (type === 'rectangle') {
	  		res.push({ k: this.state.k[dictionary[i]], a: this.state.a[dictionary[i]], b: this.state.b[dictionary[i]] });
	  	};

	  	if (type === 'square') {
	  		res.push({ k: this.state.k[dictionary[i]], a: this.state.a[dictionary[i]] });
	  	};

	  	if (type === 'circle') {
	  		res.push({ k: this.state.k[dictionary[i]], R: this.state.R[dictionary[i]] });
	  	}
  	}

  	return res;
  }

  onAfterSaveCell = (row, cellName, cellValue) => {
  	console.log('wtf', row)
	  const rowStr = {};
	  for (const prop in row) {
	  	if (prop !== "label") {
	    	rowStr[prop] = parseFloat(row[prop]);
	    }
	  }

	  this.setState({ [row.label]: { ...rowStr } }, () => this.getK());
	}

	handleInputM = (e) => {
		this.setState({ midm: e.target.value });
	} 

	handleInputH = (e) => {
		this.setState({ midh: e.target.value });
	}

	reload = () => {
		this.setState({ m: this.state.midm || this.state.m, h: this.state.midh || this.state.h }, () => this.getK());
	}

	handleChangeRadio = (e) => {
		this.setState({ type: e });
	}

	prepareProducts = () => {
		switch (this.state.type) {
			case 'rectangle':
				return [{
				      label: "a",
				      ...this.state.a
				  }, {
				      label: "b",
				      ...this.state.b
				  }, {
				  		label: "k",
				      ...this.state.k
				  }];
			case 'square':
				return [{
				      label: "a",
				      ...this.state.a
				  }, {
				  		label: "k",
				      ...this.state.k
				  }];
			case 'circle':
				return [{
				      label: "R",
				      ...this.state.R
				  }, {
				  		label: "k",
				      ...this.state.k
				  }];
		}
	}

   render() {
   	const products = this.prepareProducts();

	  const cellEditProp = {
		  mode: 'click',
		  blurToSave: true,
		  afterSaveCell: this.onAfterSaveCell
		};

    return (
    	<div>
    		<div className="btn">
          <Link to="/">
            <p>Назад</p>
          </Link>
        </div>
        <RadioGroup onChange={this.handleChangeRadio} horizontal>
				  	<RadioButton value="rectangle">
				    		прямоугольник (a > b)
					  </RadioButton>
					  <RadioButton value="square">
					   		кварат (a = b)
					  </RadioButton>
					  <RadioButton value="circle">
					   	  круг (радиусом R)
					  </RadioButton>
				</RadioGroup>
	      <BootstrapTable data={ products } cellEdit={ cellEditProp } selectRow={{ columnWidth: '60px' }}>
	          <TableHeaderColumn style={{ width: '300px' }} dataField='label' isKey>Параметр</TableHeaderColumn>
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

	      <div>
		      m(мю) = <input type="text" value={this.state.midm} onChange={this.handleInputM} />
		      <p />
		      h = <input type="text" value={this.state.midh} onChange={this.handleInputH} />
		      <p />
		      <button onClick={this.reload} type="button">Обновить</button>
		    </div>

		    <div>
		     	{this.state.ready
		     		? (<LineChart width={600} height={300} data={this.prepareChartData()}
			        	margin={{top: 5, right: 30, left: 20, bottom: 5}}>
				       <XAxis />
				       <YAxis />
				       <CartesianGrid strokeDasharray="3 3"/>
				       <Tooltip/>
				       <Legend />
				       <Line type="monotone" dataKey="k" stroke="red" activeDot={{r: 8}}/>
				       <Line type="monotone" dataKey={this.state.type === 'circle' ? 'R' : 'a'} stroke="#82ca9d" />
				       {this.state.type === 'rectangle' ? <Line type="monotone" dataKey="b" stroke="#8884d8" /> : null}
				      </LineChart>)
		     		: null}
		     	</div>
	     </div>
    );
  }
}

export default KoefDempf;
