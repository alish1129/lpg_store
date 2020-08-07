import React, { useEffect } from 'react';
import Layout from './Layout';
import { connect } from 'react-redux';

import { getAllProducts } from '../actions/products';

const Home = (props) => {
	useEffect(() => {
		props.getAllProducts('price', 'desc', 50);
	}, []);

	const showList = () => {
		return props.products.map((product, index) => (
			<div key={product.key} className="jumbotron">
				<h2>{index + 1 + '. ' + product.name}</h2>
				<p>{product.description}</p>
			</div>
		));
	};

	return (
		<Layout title="Home Page" description="LPG gas store online">
			<div>{showList()}</div>
		</Layout>
	);
};

const mapStateToProps = (state) => ({
	products: state.products.products
});

export default connect(mapStateToProps, { getAllProducts })(Home);
