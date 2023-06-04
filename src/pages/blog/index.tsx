import Head from "next/head";

import  { ReactNode,FC,useState, useEffect } from "react";
import type { NextPageWithLayout } from "@/types";

import { BlogsMain, Layout } from "@/components";

const BlogsPage: NextPageWithLayout = () => {

   const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

const idToken = sessionStorage.getItem("tokenid");;
const fetchPost = async () => {
    try {
        const res = await fetch(`https://diet-ideas-production.up.railway.app/v1/blog?search=&page=1&page_size=10`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}`,
          },
        });
    
        if (!res.ok) {
          throw new Error('Failed to update meal item');
        }
    
        const datas = await res.json();
        //data =datas.data.services
        setUsers(datas.data.blogs)
        console.log(datas.data.blogs);
        return datas.data.blogs;
      } catch (error) {
        console.error(error);
        throw error;
      }
}
    useEffect( ()  =>{
      fetchPost();
    }
    
  );

  return (
    <>
      <Head>
        <title>Blogs Management | Operation Dashboard | Diet Ideas</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <BlogsMain />
      </main>
    </>
  );
};

BlogsPage.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default BlogsPage;
