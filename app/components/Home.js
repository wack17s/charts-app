// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';

export default class Home extends Component {
	render() {
		return (
			<div>
				<h2>ГАЗОВОЕ ДЕМПФИРОВАНИЕ ЧЭ МИКРОАКСЕЛЕРОМЕТРОВ</h2>
				<div className={styles.container} data-tid="container">
					<Link to="/koefDempf">Коэффициент демпфирования в направлении оси y.</Link>
					<p />
					<Link to="/koefDempf1">to Counter</Link>
					<p />
					<Link to="/koefDempf1">to Counter</Link>
				</div>
			</div>
		);
	}
}
