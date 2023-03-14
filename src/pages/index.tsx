// @ts-nocheck
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Malleable, { FieldEdit } from '../components/malleable';
import layoutStyles from '../styles/layout.module.css';
import { Stack, onEntryChange } from '../utils';
import RefField1 from './ref_field';
import Contentstack from 'contentstack';

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

  useEffect(() => {
    onEntryChange(async () => {
      const newEntry = await fetchData();
      Contentstack.Utils.addEditableTags(newEntry,"csr_demo",true,newEntry?.locale);
      console.log('new entry',newEntry);
      
      setEntry(newEntry);
    });
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
        <Content isEdit={false} edits={[]} entry={entry} />
      </div>
    </>
  );
}


function Content({ isEdit, edits, entry }: { isEdit: boolean; edits: FieldEdit[], entry: any }) {

  const fetchRefFieldData = () => {
    return (
      <div className="explanation">
        {
          entry.modular_blocks.map((block) => {
            if (block.ref_field_1) {
              const refEntry = block.ref_field_1.reference?.["0"];
              return (
                <RefField1 refEntry={refEntry} />
              )
            } else {
              const refEntry = block.ref_field_2.reference?.["0"];
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
      <Malleable  id="title" as="h1" isActive={isEdit} edits={edits}>
        <p {...entry?.$?.title}> {entry.title} </p>
      </Malleable>
      <Malleable as="h2" id="title-2" isActive={isEdit} edits={edits}>
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


      { fetchRefFieldData() }
    </>
  );
}
