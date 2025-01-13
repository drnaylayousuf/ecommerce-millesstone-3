




import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';

type Product = {
  _id: string;
  image: string;
  name: string;
  price: string;
  

};

export default async function Ourshop() {
  const products: Product[] = await client.fetch(`

*[_type == "product"]{
      name,
      image,
      price,
      _id
    }

  `);

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
    {/* Hero Section with Image */}
    <div className="relative">
      <div className="relative w-full h-[300px]">
        <Image
          src="/productlisting.png" // Replace with dynamic product image URL if needed
          alt="Product image"
          fill
          className="object-cover"
        />
        <h1 className="absolute inset-0 flex items-center lg:items-end justify-center lg:justify-start text-white text-3xl pl-20 pb-8 font-semibold p-4 bg-opacity-50 bg-black/40">
          All Products
        </h1>
      </div>
    </div>
  
    {/* Product List Section */}
    <div className="mt-9 p-4">
      <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2">
        {products.map((product) => (
          <div key={product._id} className="mb-16 bg-gray-100 rounded-lg mx-auto">
            <Link href={`/products/${product._id}`}>
              <div className="relative">
                <Image
                  src={urlFor(product.image).url()}
                  alt={product.name}
                  width={350}
                  height={300}
                  className="rounded-lg object-cover"
                />
              </div>
            </Link>
            <div className="p-2">
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-gray-500">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  
  );
}




























