// productController.ts

import { Request, Response } from 'express';
import {
  getAllProducts,
  getProductsByCategory,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from '../models/productModel';

// Obtener todos los productos
const getAll = async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Obtener productos por categoría
const getByCategory = async (req: Request, res: Response) => {
  const { category } = req.params;
  try {
    const products = await getProductsByCategory(category);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error al obtener productos por categoría:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Obtener producto por ID
const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await getProductById(parseInt(id, 10));
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Agregar un nuevo producto
const add = async (req: Request, res: Response) => {
  const { categoria, nombre, talla, estado, precio, imagen } = req.body;
  try {
    const result = await addProduct({ categoria, nombre, talla, estado, precio, imagen });
    res.status(201).json({ message: 'Producto agregado correctamente', productId: result.insertId });
  } catch (error) {
    console.error('Error al agregar el producto:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Actualizar un producto
const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { categoria, nombre, talla, estado, precio, imagen } = req.body;
  try {
    const success = await updateProduct(parseInt(id, 10), { categoria, nombre, talla, estado, precio, imagen });
    if (success) {
      res.status(200).json({ message: 'Producto actualizado correctamente' });
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Eliminar un producto
const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const success = await deleteProduct(parseInt(id, 10));
    if (success) {
      res.status(200).json({ message: 'Producto eliminado correctamente' });
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export {
  getAll,
  getByCategory,
  getById,
  add,
  update,
  remove,
};
