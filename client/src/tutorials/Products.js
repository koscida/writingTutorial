import React from 'react';

class Products extends React.Component {
	state = {
		products:[],
		product: {
			name: '',
			price: ''
		}
	}
	
	componentDidMount() {
		this.getProducts();
	}
	
	getProducts = (_) => {
		fetch('http://localhost:5000/products')
		.then(response => {
			console.log(response)
			return response.json()
		})
		.then( ({ data }) => {
			console.log(data)
			this.setState({products: data})
		})
		.catch(error => console.log(error));
	}
	
	addProduct = (_) => {
		const { product: {name, price} } = this.state
		fetch(`http://localhost:5000/products/add?name=${name}&price=${price}`)
			.then(response => response.json())
			.then(this.getProducts)
			.catch(err => console.error(err))
	}
	
	handleNameChange = e => {
		const { product } = this.state
		this.setState({ product: {...product, name: e.target.value }})
	}
	
	handlePriceChange = e => {
		const { product } = this.state
		this.setState({ product: {...product, price: e.target.value }})
	}
	
	
	render() {
		const { products, product: {name, price} } = this.state
		return (
			<div className="App">
				<ul>
					{products.map( product => 
						<li key={product.product_id}>{product.name}: {product.price}</li>
					)}
				</ul>
				<input 
					type="text" 
					value={name} 
					onChange={this.handleNameChange}
					placeholder="name"
				/>
				<input 
					type="text" 
					value={price} 
					onChange={this.handlePriceChange} 
					placeholder="price"
				/>
				<button onClick={this.addProduct}>Add Product</button>
			</div>
		 );
	}
  
}

export default Products;
