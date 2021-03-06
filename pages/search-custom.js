import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Head from 'next/head'
import useHackerNews from '../lib/usehackernews'
import Container from '../components/container'
import Header from '../components/header'
import SectionSeparator from '../components/section-separator'
import Layout from '../components/layout'
import { CMS_NAME } from '../lib/constants'
import styles from '../components/post-body.module.css'

export default function SearchCustom({ preview }) {
  const {register, handleSubmit} = useForm();
  const [search, setSearch] = useState('react')
  const [{ data, isLoading, isError }, doFetch] = useHackerNews();

  function onSubmitForm(formData) {
    console.log('submit: ' + formData.query)
    setSearch(formData.query)
    doFetch(search)
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
