import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({
    message: 'Hello World',
  });
});

routes.get('/products', ProductsController.index);
routes.put('/products/:id', ProductsController.update);

export default routes;
