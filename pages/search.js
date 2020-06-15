import React, { useState, useEffect } from "react";
import axios from 'axios';
import Head from 'next/head'
import Container from '../components/container'
import Header from '../components/header'
import SectionSeparator from '../components/section-separator'
import Layout from '../components/layout'
import { CMS_NAME } from '../lib/constants'
import { useForm } from "react-hook-form";
import styles from '../components/post-body.module.css'

export default function Search({ preview }) {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState('redux')
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const {register, handleSubmit} = useForm();
  var date = new Date(); 

  useEffect(() => {
    function getFetchUrl() {
      console.log(query)
      return 'https://hn.algolia.com/api/v1/search?query=' + query;
    }

    async function fetchData() {
      setIsLoading(true)
      setIsError(false)
      try{
        const result = await axios(getFetchUrl());
        setData(result.data);
      }
      catch(error){
        setIsError(true)
      }
      setIsLoading(false)
    }

    fetchData();
  }, [query]);

  function onSubmitForm(formData) {
    console.log('submit: ' + formData.query)
    setQuery(formData.query);
  }  

  return (
    <Layout preview={preview}>
      <Container>
        <Header />
          <>
            <article>
              <Head>
                <title>
                  Search | Next.js Blog Example with {CMS_NAME}
                </title>
              </Head>
              <div className="max-w-2xl mx-auto">
                <div className={styles.content}>
                  <form onSubmit={handleSubmit(onSubmitForm)}>
                    <label>
                      Query:
                      <input type="text" name="query" ref={register} />
                    </label>
                    <input type="submit" value="Submit" />
                  </form>
                  {isError && <div>Something went wrong ...</div>}
                  {(isLoading ? (
                    <div>Loading...</div>
                  ):
                  (
                  <ul>
                    {data.hits.map(item => (
                      <li key={item.objectID}>
                        <a href={item.url}>{item.title}</a>
                      </li>
                    ))}
                  </ul>
                  ))}
                </div>
              </div>
            </article>

            <SectionSeparator />
          </>
      </Container>
    </Layout>
  )
}

export async function getServerProps({params, preview = false, previewData}) {
  return {
    props: {
      preview
    }
  }
}
