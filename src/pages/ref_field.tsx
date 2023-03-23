// @ts-nocheck
import { useEffect, useState } from "react";
import Malleable from "../components/malleable";
import { onEntryChange } from "../utils";
import ContentstackLivePreview from '@contentstack/live-preview-utils';
import Contentstack from 'contentstack';

const Stack = Contentstack.Stack({
    api_key: "bltcf74a9ab795009ca",
    delivery_token: "cs9b220eda212bb79c63ea9ec1",
    environment: "ssr",
  });
  

const fetchData = async () => {
    const result = await Stack.ContentType("reference_support_child").Query().toJSON().find();
    return result[0][0] || {};
}

export const getStaticProps = async () => {
    // get all the data needed for rendering the page
    const entry = await fetchData();
    return { props: { isPreview: false, initialEntry: entry } };
};

// This RefField1 component we are using to render the the reference field from the entry
export default function RefField1(props) {
    const [entry, setEntry] = useState(props.initialEntry || {});
    // in props we are passing the entry from the home page, this will help us when we want the see the draft changes of referred entry inside live preview without saving or publishing it.
    const refEntry = props.refEntry;
    useEffect( () => {
        fetchData().then(entry => {
            setEntry(entry);
        });
    }, [])

    return (
        <>
            <Malleable id="explanation-2" isActive={false} edits={[]}>
                {/* We are rendering this title with the data we are getting from upper component. If you change reference entry title and open the live preview, you will see the draft changes for 
                your reference entry without saving or publishing it. its ideal to pass the reference field data from upper component and render it here, with this you don't have to make another call to fetch
                reference entry and the live preview will work for you reference entry as well  */}
               <p {...entry?.$?.title}> {refEntry.title} </p>
            </Malleable>
            <Malleable id="explanation-3" isActive={false} edits={[]}>
                {/* We are rendering this single line field from the entry data we are fetching inside this component by calling fetchData function inside useEffect. In this data field if you change anything in reference entry single line
                 you will not see any changes until unless you save or publish the reference entry. */}
                <p {...entry?.$?.single_line}> {entry.single_line} </p>
            </Malleable>
        </>
    )
}