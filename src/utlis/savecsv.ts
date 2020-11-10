import { createObjectCsvWriter } from 'csv-writer';
import path from 'path';

interface Product {
  id: string;
  image: string;
  name: string;
  categories: string;
  price: number;
  brand: string;
}

export default async (data: Product[]) => {
  const csvWriter = createObjectCsvWriter({
    path: path.resolve(__dirname, '..', 'data', 'products.csv'),
    fieldDelimiter: ';',
    header: [
      { id: 'id', title: 'id' },
      { id: 'image', title: 'image' },
      { id: 'name', title: 'name' },
      { id: 'categories', title: 'categories' },
      { id: 'price', title: 'price' },
      { id: 'brand', title: 'brand' },
    ],
  });

  await csvWriter.writeRecords(data);
};
