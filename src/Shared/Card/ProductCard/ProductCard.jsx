import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ProductCard = ({productValueData}) => {
    return (
        <div
            className="group flex flex-col overflow-hidden border border-gray-100 bg-[#EFF4F7] shadow-md rounded"
        >
            <div className="relative flex h-[18rem] p-4 overflow-hidden">
                {
                   productValueData?.images?.map((image, index) => {
                        return (
                            <Image
                                key={index}
                                src={image}
                                alt={image?.name}
                                width={500}
                                height={500}
                                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition duration-500 ease-in-out"
                            />
                        )
                    })
                }
                <div className="absolute bottom-0 mb-4 flex w-full justify-center space-x-4">
                    <div className="h-3 w-3 rounded-full border-2 border-white bg-white" />
                    <div className="h-3 w-3 rounded-full border-2 border-white bg-transparent" />
                    <div className="h-3 w-3 rounded-full border-2 border-white bg-transparent" />
                </div>
                <div className="absolute -right-16 bottom-0 mr-2 mb-4 space-y-2 transition-all duration-300 group-hover:right-0">
                    <button className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="mt-4 px-5 pb-5">
                <Link href={`/products/${productValueData?._id}`}>
                    <h5 className="text-xl font-semibold tracking-tight text-slate-900">
                        {productValueData?.name.slice(0, 26) + ".."}
                    </h5>
                </Link>
                <div className='flex gap-4 my-2'>
                    <h1 className="font-bold text-slate-900">
                        {productValueData?.discount
                            ? `₹ ${Math.floor(productValueData?.price - (productValueData?.price * productValueData?.discount) / 100)}`
                            : `₹ ${Math.floor(productValueData?.price)}`
                        }
                    </h1>
                    <span className="text-sm text-slate-900 line-through mt-1">
                        ₹ {Math.floor(productValueData?.price)}
                    </span>
                    <span className='text-[#18568C]'>
                        {Math.floor(productValueData?.discount)} % off
                    </span>
                </div>

                <button className="flex items-center justify-center common-btn px-2 py-1 text-sm text-white transition hover:bg-gray-700">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                    Add to cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;