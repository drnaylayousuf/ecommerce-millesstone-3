


import AddToBag from '@/app/components/AddToBag';
import CheckoutNow from '@/app/components/CheckoutNow';
import ProductList from '@/app/components/productlist';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';


interface Params {
  params: {
    id: string;
  };
}

interface Iproduct {
  _id: string;
  image: string;
  name: string;
  price: number;
  description: string;
  price_id: string;
  
}

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: Params) {
  const { id } = params;
                                  
  // Fix the query syntax here by properly closing the object   
  const product:Iproduct = await client.fetch(
    ` 
*[_type == "product" && _id == $id][0]{
      name,
      image,
      description,
      price,
       _id,
      price_id
    }
      `, // Fixed the closing brace and added a comma for correct formatting
    { id }
  );
  console.log(product)

  if (!product) {
    return <div className="text-center mt-20 text-gray-500">Product not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
        <div className="w-full lg:w-1/2">
          <Image
            src={urlFor(product.image).url()} // Fix the product data access
            alt={product.name}
            width={500}
            height={500}
            className="rounded-md object-cover"
          />
        </div>
        <div className="w-full lg:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl text-amber-500 font-semibold mb-4">Price: ${product.price}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>

           <AddToBag
                currency="USD"
                description={product.description}
                image={product.image}
                name={product.name}
                price={product.price}
                key={product._id}
                price_id={product.price_id}
              />
               <CheckoutNow
                currency="USD"
                description={product.description}
                image={product.image}
                name={product.name}
                price={product.price}
                key={product._id}
                price_id={product.price_id}
              />
        </div>
      </div>
      <div className="mt-12">
           <ProductList />
        </div>
    </div>
    
  );
}












































