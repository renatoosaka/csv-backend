import { Request, Response } from 'express';
import loadCSV from '../utlis/loadcsv';
import saveCSV from '../utlis/savecsv';

export default {
  async index(_: Request, response: Response) {
    const products = await loadCSV();

    return response.json(products);
  },
  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, categories, price, brand } = request.body;

    const products = await loadCSV();

    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex < 0) {
      return response.status(400).json({
        message: `Product with id ${id} not found`,
      });
    }

    const product = {
      ...products[productIndex],
      name,
      categories,
      price,
      brand,
    };

    products[productIndex] = product;

    await saveCSV(products);

    return response.json(product);
  },
};
