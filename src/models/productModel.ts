import { pool } from '../database';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

interface Product {
  id_producto?: number;
  categoria: string;
  nombre: string;
  talla?: number | null;
  estado?: string | null;
  precio: number;
  imagen: string;
}

// Obtener todos los productos
const getAllProducts = async (): Promise<Product[]> => {
  const [rows]: [RowDataPacket[], any] = await pool.query('SELECT * FROM producto');
  return rows as Product[];
};

// Obtener productos por categoría
const getProductsByCategory = async (category: string): Promise<Product[]> => {
  const [rows]: [RowDataPacket[], any] = await pool.query('SELECT * FROM producto WHERE categoria = ?', [category]);
  return rows as Product[];
};

// Obtener producto por ID
const getProductById = async (id: number): Promise<Product | null> => {
  const [rows]: [RowDataPacket[], any] = await pool.query('SELECT * FROM producto WHERE id_producto = ?', [id]);
  if (rows.length === 0) {
    return null;
  }
  return rows[0] as Product;
};

// Agregar un nuevo producto
const addProduct = async (product: Product): Promise<ResultSetHeader> => {
  const [result]: [ResultSetHeader, any] = await pool.query(
    'INSERT INTO producto (categoria, nombre, talla, estado, precio, imagen) VALUES (?, ?, ?, ?, ?, ?)',
    [product.categoria, product.nombre, product.talla, product.estado, product.precio, product.imagen]
  );
  return result;
};

// Actualizar un producto
const updateProduct = async (id: number, product: Product): Promise<boolean> => {
  const [result]: [ResultSetHeader, any] = await pool.query(
    'UPDATE producto SET categoria = ?, nombre = ?, talla = ?, estado = ?, precio = ?, imagen = ? WHERE id_producto = ?',
    [product.categoria, product.nombre, product.talla, product.estado, product.precio, product.imagen, id]
  );
  return result.affectedRows > 0;
};

// Eliminar un producto
const deleteProduct = async (id: number): Promise<boolean> => {
  const [result]: [ResultSetHeader, any] = await pool.query('DELETE FROM producto WHERE id_producto = ?', [id]);
  return result.affectedRows > 0;
};

export { getAllProducts, getProductsByCategory, getProductById, addProduct, updateProduct, deleteProduct };
