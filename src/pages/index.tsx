// @ts-nocheck
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Malleable, { FieldEdit } from '../components/malleable';
import layoutStyles from '../styles/layout.module.css';
import { Stack, onEntryChange, onLiveEdit } from '../utils';
import RefField1 from './ref_field';
import Contentstack from 'contentstack';

// This function is used to fetch the entry content from the the contentstack server
const fetchData = async () => {
  const result = await Stack.ContentType("csr_demo").Query().includeReference(["modular_blocks.ref_field_1.reference", "modular_blocks.ref_field_2.reference"]).toJSON().find();
  return result[0][0] || {};
}

export const getStaticProps: GetStaticProps = async () => {
  // get all the data needed for rendering the page
  const entry = await fetchData();
  return { props: { isPreview: false, initialEntry: entry } };
};

export default function Home(props) {
  const [entry, setEntry] = useState(props.initialEntry);

  // Using the useEffect function with blank properties to add onEntryChange function. which will be responsible for updating the website whenever there will be modifications in contentstack entry
  useEffect(() => {
    // This onLiveEdit function is responsible for updating the the website whenever there is changes in contentstack entry. This onLiveEdit function will call the callback function you pass as 
    // an argument every time there is a change in contentstack entry.
    // Please use ( https://github.com/contentstack/live-preview-sdk/blob/main/docs/live-preview-configs.md#onliveeditcallback---void ) this 
    // url for information about onLiveEdit 

    onLiveEdit(async () => {
      // Here call this function fetchData to fetch the entry data from contentstack server
      const newEntry = await fetchData();
      // adding edit button tag data to the entry data so that we can see the edit button on hover of component.
      Contentstack.Utils.addEditableTags(newEntry,"csr_demo",true,newEntry?.locale);
      console.log('new entry',newEntry);
      // setting new entry data to the entry state to re-render the website.
      setEntry(newEntry);
    });

    // Similarly we can use onEntryChange to update the entry data.

    // onEntryChange(async () => {
    //   // Here call this function fetchData to fetch the entry data from contentstack server
    //   const newEntry = await fetchData();
    //   // adding edit button tag data to the entry data so that we can see the edit button on hover of component.
    //   Contentstack.Utils.addEditableTags(newEntry,"csr_demo",true,newEntry?.locale);
    //   console.log('new entry',newEntry);
    //   // setting new entry data to the entry state to re-render the website.
    //   setEntry(newEntry);
    // });


  }, []);

  return (
    <>
      <Head>
        <title>Next.js | Preview Mode</title>
        <meta
          name="description"
          content="This website demonstrates a static website generated using Next.js' new Static Site Generation (SSG)."
        ></meta>
        {/* Stylesheet link for edit button */}
            <link
      rel="stylesheet"
      href="https://unpkg.com/@contentstack/live-preview-utils/dist/main.css"
    />
      </Head>
      <div className={layoutStyles.layout}>
        {/* Rendering a other component to render the content inside Home page component. Passing the fetched entry to this component so that it render the data without making another call to server */}
        <Content isEdit={false} edits={[]} entry={entry} />
      </div>
    </>
  );
}

// this Functional component responsible for displaying the content of the home component entry
function Content({ isEdit, edits, entry }: { isEdit: boolean; edits: FieldEdit[], entry: any }) {

{/* This function is responsible to render the modular block fields of entry */}
  const fetchRefFieldData = () => {
    return (
      <div className="explanation">
        {
          // Running the loop on all the modular blocks available in the entry to render it accordingly. For the loop getting the entry data from the upper component
          entry.modular_blocks.map((block) => {
            if (block.ref_field_1) {
              const refEntry = block.ref_field_1.reference?.["0"];
              // rendering a new separate component for the ref_field_1 reference modular block
              return (
                <RefField1 refEntry={refEntry} />
              )
            } else {
              const refEntry = block.ref_field_2.reference?.["0"];
              // Rendering a basic modular block here 
              return (
                <>
                  <Malleable id="explanation-2" isActive={isEdit} edits={edits}>
                    {refEntry.title}
                  </Malleable>

                </>
              )
            }
          })
        }
      </div>
    )
  }


  return (
    <>
    {/* Malleable is just a basic design component. The SSG example is not dependent on this component anyhow so you can ignore this component  */}
      <Malleable  id="title" as="h1" isActive={isEdit} edits={edits}>
        {/* Rendering the title of entry */}
        <p {...entry?.$?.title}> {entry.title} </p>
      </Malleable>
      <Malleable as="h2" id="title-2" isActive={isEdit} edits={edits}>
        {/* rendering the single line field of entry */}
        <p {...entry?.$?.single_line}> {entry.single_line}</p>
      </Malleable>
      <hr />
      <hr />

      <Malleable as="h2" id="title-2" isActive={isEdit} edits={edits}>
        This demonstrates a static website generated using{' '}
        <a target="_blank" rel="noopener" href="https://nextjs.org">
          Next.js'
        </a>{' '}
        new{' '}
        <a
          target="_blank"
          rel="noopener"
          href="https://nextjs.org/docs/basic-features/data-fetching/get-static-props"
        >
          Static Site Generation (SSG)
        </a>
        .
      </Malleable>

{/* This function is responsible to render the modular block fields of entry */}
      { fetchRefFieldData() }
    </>
  );
}
