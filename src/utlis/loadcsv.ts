import csvParse from 'csv-parse';
import path from 'path';
import fs from 'fs';

interface Product {
  id: string;
  image: string;
  name: string;
  categories: string;
  price: number;
  brand: string;
}

export default async (): Promise<Product[]> => {
  const csvFilePath = path.resolve(__dirname, '..', 'data', 'products.csv');

  const readCSVStream = fs.createReadStream(csvFilePath);

  const parseStream = csvParse({
    delimiter: ';',
    skipEmptyLines: true,
    from_line: 2,
    ltrim: true,
    rtrim: true,
  });

  const parseCSV = readCSVStream.pipe(parseStream);

  const products: Product[] = [];
  parseCSV.on('data', line => {
    const [id, image, name, categories, price, brand] = line;
    products.push({
      id,
      image,
      name,
      categories,
      price: parseFloat(price),
      brand,
    });
  });

  await new Promise(resolve => {
    parseCSV.on('end', resolve);
  });

  return products;
};
