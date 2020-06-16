import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Head from 'next/head'
import useReducerApi from '../lib/usereducerapi'
import Container from '../components/container'
import Header from '../components/header'
import SectionSeparator from '../components/section-separator'
import Layout from '../components/layout'
import { CMS_NAME } from '../lib/constants'
import styles from '../components/post-body.module.css'
import Counter from '../components/countinterval'

export default function SearchReducer({ preview }) {
  const {register, handleSubmit} = useForm();
  const [search, setSearch] = useState('react')
  const [state, doFetch] = useReducerApi(`https://hn.algolia.com/api/v1/search?query=${search}`, {hits:[]});

  function onSubmitForm(formData) {
    console.log('submit: ' + formData.query)
    setSearch(formData.query)
    doFetch(`https://hn.algolia.com/api/v1/search?query=${formData.query}`)
  }  

  return (
    <Layout preview={preview}>
      <Container>
        <Header />
          <>
            <Counter />
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
                  {state.isError && <div>Something went wrong ...</div>}
                  {(state.isLoading ? (
                    <div>Loading...</div>
                  ):
                  (
                  <ul>
                    {state.data.hits.map(item => (
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
