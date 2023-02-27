import { api } from "~/utils/api"
import parse from 'html-react-parser'
import { type NextPage } from "next";
import Head from "next/head";
import { log } from "console";
import { useState } from "react";


const READER_ID = "readability-page"
const CONTAINER_ID = "readerContainerRoot"



const ArticlePage: NextPage = () => {
    const [summary, setSummary] = useState(null)
    const [urlContent, setUrlContent] = useState(null)
    const urlParse = api.article.parseArticle.useMutation()
    const summarizeArticle = api.article.summarizeArticle.useMutation()
    const summarize = async () => {
        const content = getAllTextNodes().textList.join("")
        const response = await summarizeArticle.mutateAsync({ content })
        console.log(response)
        setSummary(response?.text as any)
    }

    const getAllTextNodes = () => {
        // if (!readerContainer) return null;
        var textNodeList = [];
        var textList = [];
        // console.log(readerContainer);
        var walker = document.createTreeWalker(document.getElementById(READER_ID), NodeFilter.SHOW_TEXT, null, false);
        while (walker.nextNode()) {
            textNodeList.push(walker.currentNode);
            textList.push(walker.currentNode.textContent);
        }
        return {
            textNodeList: textNodeList,
            textList: textList
        };
    }

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
                <link rel="icon" href="/favicon.png" type="image/png" sizes="16x16" />
                <meta name="viewport" content="width=device-width, minimal-ui"></meta>
                <meta name="apple-mobile-web-app-capable" content="yes"></meta>
            </Head>
            <div className="fixed w-full h-full">
                {/* {url.data?.content} */}
                <div className="static flex flex-row w-full h-full">

                    <div className="grow p-[40px]">
                        <input placeholder="input url" className="p-2 border border-blue-200 w-full" type="input" onKeyDown={async (e) => {
                            if (e.key == 'Enter') {
                                const content = await urlParse.mutateAsync({ url: e.target.value })
                                setUrlContent(content.article?.content as any)
                            }
                        }} />
                        <div id={CONTAINER_ID} className="relative w-full overflow-y-scroll justify-center h-full items-center flex flex-col px-[20px]">
                            <div id={READER_ID} className="max-w-[680px] h-full">
                                {urlContent && parse(urlContent as string)}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-[480px] p-[20px] h-full bg-gray-100">
                        <div className="">
                            <button type="button"
                                onClick={summarize}
                                className="px-3 py-2 text-sm border rounded-md border-sky-300 bg-sky-400 text-white">
                                Summarize
                            </button>
                        </div>
                        <div>
                            {summary}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ArticlePage