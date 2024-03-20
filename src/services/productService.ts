import { AxiosResponse } from 'axios';

import client from 'src/lib/client';

const productService = {
  getProductList: async (): Promise<any> => {
    const response: AxiosResponse<any> = await client.get('https://fakestoreapi.com/products/');
    return response?.data;
  },
};

export default productService;
