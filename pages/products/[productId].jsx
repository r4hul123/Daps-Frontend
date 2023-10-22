import RootLayout from '@/src/Layouts/RootLayout';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { useContext, useEffect, useState } from 'react';
import { addToCartUrl } from '@/src/Utils/Urls/ProductUrl';
import Swal from 'sweetalert2';
import { AuthContext } from '@/src/Context/UserContext';
import useProducts from '@/src/Hooks/useProducts';
import { PaymentIcons } from '@/src/Assets';
import { BsCart } from 'react-icons/bs'
import {
    PolicyIcons,
    MapIcons,
    DelivaryIcons
} from "@/src/Assets"
import {FaRegPlusSquare} from 'react-icons/fa'
import {BiSolidOffer} from 'react-icons/bi'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const ProductDetailsPage = () => {
    const { productData } = useProducts();
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const { productId } = router.query;
    let mainProductData;

    const filterproductData = productData?.filter((data) => {
        return data?._id === productId;
    });

    if (filterproductData && filterproductData.length > 0) {
        mainProductData = filterproductData[0];
    } else {
        console.error(`No data found for ID: ${productId}`);
    }

    let product

    if (filterproductData && filterproductData.length > 0) {
        product = filterproductData[0];
    } else {
        console.error(`No data found for ID: ${productId}`);
    }


    const addToCart = async (id) => {
        const convertPrice = parseInt(product?.price);
        // Check if the user is logged in
        if (!user) {
            // User is not logged in, show an alert
            Swal.fire({
                icon: 'error',
                title: 'Please log in to add the product to your cart',
                showConfirmButton: true,
            });
            return;
        }

        const res = await fetch(addToCartUrl(id), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product: product?._id,
                quantity: 1,
                totalPrice: convertPrice,
                email: user?.email,
                status: "unpaid",
            }),
        });

        const data = await res.json();
        console.log(data);

        if (data.success) {
            Swal.fire({
                icon: 'success',
                title: 'Your product added to cart',
                showConfirmButton: false,
                timer: 1500,
            })
            router.push('/cart');
        }
    }

    const handelBuyNow = async (id) => {
        const convertPrice = parseInt(product?.price);
        // Check if the user is logged in
        if (!user) {
            // User is not logged in, show an alert
            Swal.fire({
                icon: 'error',
                title: 'Please log in to add the product to your cart',
                showConfirmButton: true,
            });
            return;
        }

        const res = await fetch(addToCartUrl(id), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product: product?._id,
                quantity: 1,
                totalPrice: convertPrice,
                email: user?.email,
                status: "unpaid",
            }),
        });

        const data = await res.json();
        console.log(data);

        if (data.success) {
            Swal.fire({
                icon: 'success',
                title: 'Your product added to cart',
                showConfirmButton: false,
                timer: 1500,
            })
            router.push('/checkout');
        }
    }
    const [copiedCoupon, setCopiedCoupon] = useState(null);

    const handleCopyCoupon = (couponCode) => {
        navigator.clipboard.writeText(couponCode)
            .then(() => {
                setCopiedCoupon(couponCode);
                setTimeout(() => setCopiedCoupon(null), 2000);
            })
            .catch((err) => console.error('Failed to copy:', err));
    };

    const [selectedImage, setSelectedImage] = useState(product?.images[0]);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };




    return (
        <RootLayout>
            <section className='container'>
                <section className="py-8">
                    <div className="container mx-auto px-4">
                        <div className="lg:col-gap-12 xl:col-gap-16  grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
                            <div className="lg:col-span-3 lg:row-end-1">
                                <div className="lg:flex lg:items-start">
                                    <div className="lg:order-2 lg:ml-5">
                                        <div className="max-w-xl overflow-hidden rounded-lg">
                                            <img
                                                className="h-full w-full max-w-full object-cover"
                                                src={selectedImage || product?.images[0]}
                                                alt={product?.name}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                                        <div className="flex flex-row items-start lg:flex-col">
                                            {product?.images?.map((image, index) => (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    className="flex-0 aspect-square mb-3 mx-2 h-20 overflow-hidden rounded-lg border-2 border-gray-900 text-center"
                                                    onClick={() => handleImageClick(image)}
                                                >
                                                    <img
                                                        className="h-full w-full object-cover"
                                                        src={image}
                                                        alt={product?.name}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
                                <h1 className="text-2xl font-semibold">
                                    {product?.name}
                                </h1>
                                <div className='my-2'>
                                    <p className="text-[1.5rem] text-gray-900 font-semibold">
                                        <span className=''>
                                            {product?.discount
                                                ? `₹ ${Math.floor(product?.price - (product?.price * product?.discount) / 100)}`
                                                : `₹ ${Math.floor(product?.price)}`
                                            }
                                        </span>
                                        <span className=" text-gray-300 line-through mx-4">
                                            ₹ {Math.floor(product?.price)}
                                        </span>
                                        <span className='text-[#18568C] '>
                                            {Math.floor(product?.discount)} % off
                                        </span>
                                    </p>
                                </div>

                                <h2 className="my-2">{product?.details.slice(0, 150)}</h2>

                                <div className='border p-2 rounded bg-[#E7F3EC]'>
                                    <h1 className='font-bold text-[1.2rem]'>Get this for as low as  <span className='text-[#29679e]'>Rs. {Math.round(product?.price)}</span> </h1>
                                    <p>
                                        with these offers.
                                    </p>
                                </div>

                                <h2 className="my-2  text-[#29679e]">{product?.discount} % Discount</h2>
                                <div className='my-2'>
                                    <Image
                                        src={PaymentIcons}
                                        alt={"payment"}
                                        width={100}
                                        height={100}
                                        className='w-full h-full'
                                    />
                                </div>
                                <div className="mt-4 flex flex-col items-center  space-y-4 border-t border-b py-4  w-full">
                                    <button
                                        onClick={() => addToCart(product?._id)}
                                        className="font-semibold hover:before:bg-blackborder-black relative h-[50px] w-full rounded overflow-hidden border border-black bg-white px-3 text-black shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-500 hover:text-white hover:shadow-white hover:before:left-0 hover:before:w-full">
                                        <span className="relative z-10 flex items-center gap-2 justify-center">
                                            <BsCart className='text-[1.2rem]' />   Add to cart
                                        </span>
                                    </button>

                                    <button
                                        onClick={() => handelBuyNow(product?._id)}
                                        className="relative flex h-[50px] w-full items-center justify-center overflow-hidden bg-blue-600 font-medium text-white shadow-2xl transition-all duration-300 before:absolute before:inset-0 before:border-0 before:border-white before:duration-100 before:ease-linear hover:bg-white hover:text-blue-600 hover:shadow-blue-600 hover:before:border-[25px]">
                                        <span className="relative z-10 flex items-center gap-2 justify-center">
                                            <BsCart className='text-[1.2rem]' />  Buy Now
                                        </span>
                                    </button>
                                </div>

                                <div className='border text-center p-2 mt-4 flex items-center justify-center gap-4 rounded bg-[#E7F3EC]'>
                                    <div className='flex flex-col items-center justify-center gap-2'>
                                        <Image
                                            src={PolicyIcons}
                                            alt={"policy"}
                                            width={50}
                                            height={50}
                                            className='w-[3.5rem] h-[3.5rem] object-cover'
                                        />
                                        <h1 className='text-center font-semibold'>
                                            7 Days free exchange policy
                                        </h1>
                                    </div>
                                    <div className='flex flex-col items-center justify-center gap-2'>
                                        <Image
                                            src={MapIcons}
                                            alt={"policy"}
                                            width={50}
                                            height={50}
                                            className='w-[3.5rem] h-[3.5rem] object-cover'
                                        />
                                        <h1 className='text-center font-semibold'>
                                            Made in India with love
                                        </h1>
                                    </div>
                                    <div className='flex flex-col items-center justify-center gap-2'>
                                        <Image
                                            src={DelivaryIcons}
                                            alt={"DelivaryIcons"}
                                            width={50}
                                            height={50}
                                            className='w-[3.5rem] h-[3.5rem] object-cover'
                                        />
                                        <h1 className='text-center font-semibold'>
                                            Free delivery* within 4-5 days
                                        </h1>
                                    </div>
                                </div>
                                <hr className='my-4' />
                                <div>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography className='font-semibold'>REASONS TO BUY</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                          <div className='flex flex-col gap-4'>
                                            <h1 className='flex items-center gap-2'>
                                                <FaRegPlusSquare className='text-[1.5rem]'/> <span>Vehicle History Reports</span>
                                            </h1>
                                            <h1 className='flex items-center gap-2'>
                                                <FaRegPlusSquare className='text-[1.5rem]'/> <span>Environmentally Friendly Options</span>
                                            </h1>
                                            <h1 className='flex items-center gap-2'>
                                                <FaRegPlusSquare className='text-[1.5rem]'/> <span>Price Comparison</span>
                                            </h1>
                                          </div>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2a-content"
                                            id="panel2a-header"
                                        >
                                            <Typography className='font-semibold'>OFFERS</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        <div className='flex flex-col gap-4'>
                                            <div className='flex items-center gap-4'>
                                            <h1 className='flex items-center border p-4 rounded-full gap-2'>
                                            <BiSolidOffer className='text-[2rem]'/>
                                            </h1>
                                            <div>
                                                
                                            <p> <span>Special 5% off,</span> only this weekend. Use code <span className='font-semibold'> FESTIVE5 </span></p>
                                            <p> Discounted Price: 
                                                 {product?.discount
                                                    ? `₹ ${Math.floor(product?.price - (product?.price * product?.discount) / 100)}`
                                                    : `₹ ${Math.floor(product?.price)}`
                                                }
                                            </p> 
                                            </div>
                                            </div>
                                         
                                          </div>
                                        </AccordionDetails>
                                    </Accordion>

                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2a-content"
                                            id="panel2a-header"
                                        >
                                            <Typography className='font-semibold'>DESCRIPTION</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        <div className='flex flex-col gap-4'>
                                            <h1 className='flex items-center border p-4 rounded-full gap-2'>
                                            {product?.details}
                                            </h1>
                                          </div>
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                                <hr />
                                <ul className="mt-8 space-y-2">
                                    <li className="flex items-center text-left text-sm font-medium text-gray-600">
                                        <svg
                                            className="mr-2 block h-5 w-5 align-middle text-gray-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                className=""
                                            />
                                        </svg>
                                        Free shipping worldwide
                                    </li>
                                    <li className="flex items-center text-left text-sm font-medium text-gray-600">
                                        <svg
                                            className="mr-2 block h-5 w-5 align-middle text-gray-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                                className=""
                                            />
                                        </svg>
                                        Cancel Anytime
                                    </li>
                                </ul>
                                <div className='my-4 '>
                                    <Swiper
                                        className="couponSwiper"
                                        spaceBetween={20}
                                        slidesPerView={1}
                                        loop={true}
                                    >
                                        {product?.coupon && product?.coupon?.map((coupon, index) => (
                                            <SwiperSlide key={index}

                                            >
                                                <div className="bg-gradient-to-br w-full from-purple-600 to-indigo-600 text-white text-center py-6 px-6 rounded-lg shadow-md relative">
                                                    <h3 className="text-2xl font-semibold mb-4">
                                                        {coupon?.couponText}
                                                    </h3>
                                                    <div className="flex items-center justify-center md:flex-row gap-4 flex-col space-x-2 mb-6">
                                                        <span
                                                            id="cpnCode"
                                                            className="border-dashed border text-white px-4 py-2 rounded-l"
                                                        >
                                                            {coupon?.coupon}
                                                        </span>
                                                        <span
                                                            id="cpnBtn"
                                                            className="border border-white bg-white text-purple-600 px-4 py-2 rounded-r cursor-pointer"
                                                            onClick={() => handleCopyCoupon(coupon?.coupon)}
                                                        >
                                                            {copiedCoupon === coupon?.coupon ? 'Copied!' : 'Copy Code'}
                                                        </span>
                                                    </div>
                                                    <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 left-0 -ml-6" />
                                                    <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 right-0 -mr-6" />
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                            <div className="lg:col-span-3">
                                <div className="border-b border-gray-300">
                                    <nav className="flex gap-4">
                                        <a
                                            href="#"
                                            title=""
                                            className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"
                                        >
                                            {" "}
                                            Description{" "}
                                        </a>

                                    </nav>
                                </div>
                                <div className="mt-8 flow-root sm:mt-12">
                                    <h1 className="text-3xl font-bold">Details</h1>
                                    <p className="mt-4">
                                        {product?.details}
                                    </p>
                                    <h1 className="mt-8 text-3xl font-bold">
                                        Features
                                    </h1>
                                    <p className="mt-4">
                                        {
                                            product?.features && product?.features?.map((feature, index) => {
                                                return (
                                                    <li key={index} className='relative after:w-[10px] mt-2 after:rounded-full after:top-0 after:bottom-0 after:my-auto after:h-[10px] after:bg-[#3d3c3c] after:absolute after:left-0 pl-4'>{feature}</li>
                                                )
                                            })
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </section>
        </RootLayout>
    );
};

export default ProductDetailsPage;
