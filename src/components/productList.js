import React, { useState, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../services/productService';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const products = await getProducts();
        setProducts(Object.values(products));
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const filteredProducts = products.filter(product =>
        product.code.toLowerCase().includes(filter.toLowerCase())
    );

    const handleAddProduct = async () => {
        const newProduct = {
            code: 'P001',
            description: 'React Product',
            status: 'Active',
            expireDate: new Date().toISOString().split('T')[0]
        };
        await addProduct(newProduct);
        loadProducts();
    };

    const handleUpdateProduct = async (code) => {
        const updatedProduct = {
            code: 'P002',
            description: 'Updated React Product',
            status: 'Inactive',
            expireDate: new Date().toISOString().split('T')[0]
        };
        await updateProduct(code, updatedProduct);
        loadProducts();
    };

    const handleDeleteProduct = async (code) => {
        await deleteProduct(code);
        loadProducts();
    };

    return (
        <div>
            <h1>Product List</h1>
            <input type="text" value={filter} onChange={handleFilterChange} placeholder="Filter by code" />
            <button onClick={handleAddProduct}>Add Product</button>
            <ul>
                {filteredProducts.map(product => (
                    <li key={product.code}>
                        {product.code} - {product.description} - {product.status} - {product.expireDate}
                        <button onClick={() => handleUpdateProduct(product.code)}> Update</button>
                        <button onClick={() => handleDeleteProduct(product.code)}> Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
    
};

export default ProductList;
