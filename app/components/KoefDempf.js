import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import TeX from 'react-formula-beautifier';

import styles from './KoefDempf.css';
import './react-bootstrap-table-all.min.css';

class KoefDempf extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'rectangle',
            a: {
                one: 7.5,
                two: 8,
                three: 8.5,
                four: 9,
                five: 9.48,
                six: 10,
                seven: 10.5,
                eight: 12,
                nine: 15,
                ten: 20
            },
            b: {
                one: 8,
                two: 8.5,
                three: 9,
                four: 9.5,
                five: 10,
                six: 11,
                seven: 13,
                eight: 15,
                nine: 17,
                ten: 22
            },
            R: {
                one: 3.5,
                two: 4,
                three: 4.5,
                four: 5,
                five: 5.5,
                six: 6,
                seven: 6.5,
                eight: 7,
                nine: 7.5,
                ten: 8
            },
            m: 0.017,
            h: 0.018,
            midm: 0.017,
            midh: 0.018,
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
                k[dictionary[i]] = (Math.round(2 * m * a[dictionary[i]] * b[dictionary[i]] *
                    b[dictionary[i]] * b[dictionary[i]] / (h * h * h) * 10000) / 100000000000).toFixed(2);
            };

            if (type === 'square') {
                k[dictionary[i]] = (Math.round(m * a[dictionary[i]] * a[dictionary[i]] * a[dictionary[i]] * a[dictionary[i]] /
                    (h * h * h) * 10000) / 100000000000).toFixed(2);
            };

            if (type === 'circle') {
                k[dictionary[i]] = (Math.round(3 * m * Math.PI * R[dictionary[i]] * R[dictionary[i]] * R[dictionary[i]] * R[dictionary[i]] /
                    (h * h * h) * 10000) / 100000000000).toFixed(2);
            }
        }

        this.setState({ k, ready: true });
    }

    prepareChartData = () => {
        const { type } = this.state;
        const dictionary = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

        const res = [null];

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
                <BootstrapTable data={products} cellEdit={cellEditProp} selectRow={{ columnWidth: '10px' }}>
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

                <div style={{ width: '300px' }}>
                    <div style={{ float: 'left', textAlign: 'center' }}>
                        m(мю) = <input type="text" value={this.state.midm} onChange={this.handleInputM} />
                    </div>

                    <div style={{ float: 'right' }}>
                        <TeX value='10^{-3}' />
                    </div>
                </div>
                <div style={{ width: '300px' }}>
                    <div style={{ float: 'left', textAlign: 'center' }}>
                        h = <input type="text" value={this.state.midh} onChange={this.handleInputH} />
                    </div>

                    <div style={{ float: 'right' }}>
                        <TeX value='10^{-3}' />
                    </div>
                </div>

                <div style={{ float: 'left' }}>
                    <button onClick={this.reload} type="button">Обновить</button>
                </div>

                <div style={{ float: 'right' }}>
                    Все значения в таблице указаны с умножением на:
                    <TeX value='10^{-3}' />
                    ! ! ! ! !
                </div>

                <div style={{ paddingTop: '100px' }}>
                    {this.state.ready
                        ? (<LineChart width={600} height={300} data={this.prepareChartData()}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <XAxis />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="k" stroke="red" activeDot={{ r: 8 }} />
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
