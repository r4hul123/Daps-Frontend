import React from 'react';
import { useRouter } from 'next/router';
import useBlogs from "@/src/Hooks/useBlogs";
import Link from "next/link";
import RootLayout from '@/src/Layouts/RootLayout';

const BlogDetailPage = () => {
    const { blogData } = useBlogs();
    const router = useRouter();
    const { blogId } = router.query;

    const filterBlogData = blogData?.filter((data) => {
        return data?._id === blogId;
    });

    let blog

    if (filterBlogData && filterBlogData.length > 0) {
        blog = filterBlogData[0];
        // Access other properties of 'product' as needed
    } else {
        console.error(`No data found for ID: ${blogId}`);
    }



    return (
        <RootLayout>
            <section className='mx-2 md:mx-0 md:container'>
                <div className="mt-6 bg-gray-50">
                    <div className=" px-10 py-6 mx-auto">
                        {/*author*/}
                        <div className="max-w-6xl px-10 py-6 mx-auto bg-gray-50">
                            <a
                                href="#_"
                                className="block transition duration-200 ease-out transform hover:scale-110"
                            >
                                <img
                                    className="object-cover w-full shadow-sm h-full"
                                    src={blog?.image}
                                    alt={blog?.title}
                                />
                            </a>
                            {/*post categories*/}
                            <div className="flex items-center justify-start mt-4 mb-4">

                                {blog?.tags.map((tag) => {
                                    return (
                                        <span key={tag} className="px-2 py-1 font-bold bg-red-400 text-white rounded-lg hover:bg-gray-500 mr-4"> #{tag} </span>
                                    )
                                })}

                            </div>
                            <div className="mt-2">
                                {/*post heading*/}
                                <a
                                    href="#"
                                    className="sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-purple-500  hover:underline"
                                >
                                    {blog?.title}
                                </a>
                                {/*post views*/}
                                {/* <div className="flex justify-start items-center mt-2">
                                    <p className="text-sm text-green-500 font-bold bg-gray-100 rounded-full py-2 px-2 hover:text-red-500">
                                        3000
                                    </p>
                                    <p className="text-sm text-gray-400 font-bold ml-5">Views</p>
                                </div> */}
                                {/*author avator*/}
                                <div className="font-light text-gray-600">
                                    <a href="#" className="flex items-center mt-6 mb-6">
                                        <img
                                            src="https://avatars.githubusercontent.com/u/71964085?v=4"
                                            alt="avatar"
                                            className="hidden object-cover w-14 h-14 mx-4 rounded-full sm:block"
                                        />
                                        <h1 className="font-bold text-gray-700 hover:underline">
                                           {blog?.author}
                                        </h1>
                                    </a>
                                </div>
                            </div>
                            {/*end post header*/}
                            {/*post content*/}
                            <div className="max-w-4xl px-10  mx-auto text-2xl text-gray-700 mt-4 rounded bg-gray-100">
                                {/*content body*/}
                                <div>
                                    <p className="mt-2 p-8">
                                        {blog?.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/*related posts*/}
                        <h2 className="text-2xl mt-4 text-gray-500 font-bold text-center">
                            Related Posts
                        </h2>
                        <div className=" grid h-full grid-cols-12 gap-10 pb-10 mt-8 sm:mt-16">
                            <div className="grid grid-cols-12 col-span-12 gap-7">
                                {
                                    blogData && blogData?.slice(0, 3)?.map((blogD) => {
                                        return (
                                            <div className="flex flex-col items-start col-span-12 overflow-hidden shadow-sm rounded-xl md:col-span-6 lg:col-span-4">
                                                <a
                                                    href="#_"
                                                    className="w-full transition duration-200 ease-out transform hover:scale-110"
                                                >
                                                    <img
                                                        className="object-cover w-full shadow-sm h-full"
                                                        src={blogD?.image}
                                                        alt={blogD?.title}
                                                    />
                                                </a>
                                                <div className="relative flex flex-col items-start px-6 bg-white border border-t-0 border-gray-200 py-7 rounded-b-2xl">
                                                    <div className="bg-indigo-400 absolute top-0 -mt-3 flex items-center px-3 py-1.5 leading-none w-auto  rounded-full text-xs font-medium uppercase text-white">
                                                        <span>{blogD?.tags[0]}</span>
                                                    </div>
                                                    <h2 className="text-base text-gray-500 font-bold sm:text-lg md:text-xl">
                                                        <Link href="#_">
                                                            {blogD?.title}
                                                        </Link>
                                                    </h2>
                                                    {/* <p class="mt-2 text-sm text-gray-500">Learn how to authenticate users to your application using facebook.</p> */}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                      
                    </div>
                </div>

            </section>
        </RootLayout>
    );
};

export default BlogDetailPage;
