import React, { useState, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../services/productService';
import { TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Container, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Product List
            </Typography>
            <Box mb={2}>
                <TextField 
                    label="Filter by code"
                    variant="outlined"
                    value={filter}
                    onChange={handleFilterChange}
                    fullWidth
                />
            </Box>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={handleAddProduct}
                style={{ marginBottom: '20px' }}
            >
                Add Product
            </Button>
            <List>
                {filteredProducts.map(product => (
                    <ListItem key={product.code}>
                        <ListItemText 
                            primary={`${product.code} - ${product.description}`}
                            secondary={`Status: ${product.status} - Expire Date: ${product.expireDate}`}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" onClick={() => handleUpdateProduct(product.code)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton edge="end" onClick={() => handleDeleteProduct(product.code)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default ProductList;
