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

export default function RefField1(props) {
    const [entry, setEntry] = useState(props.initialEntry || {});
    // in props we are passing the entry from the home page, this will help us when we want the see the draft changes of referred entry inside live preview without saving or publishing it.
    const refEntry = props.refEntry;
    useEffect( () => {
        fetchData().then(entry => {
            Contentstack.Utils.addEditableTags(entry,"reference_support_child",true,entry?.locale);
            setEntry(entry);
        });
    }, [])

    return (
        <>
            <Malleable id="explanation-2" isActive={false} edits={[]}>
               <p {...entry?.$?.title}> {refEntry.title} </p>
            </Malleable>
            <Malleable id="explanation-3" isActive={false} edits={[]}>
                <p {...entry?.$?.single_line}> {entry.single_line} </p>
            </Malleable>
        </>
    )
}