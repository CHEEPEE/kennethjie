import axios from "axios";
import { z } from "zod";
import { Readability } from '@mozilla/readability'
const JSDOM = require('jsdom').JSDOM
import metadataParser from '../../parser-lib/parse'
import { Configuration, OpenAIApi } from 'openai'
import { env } from "~/env.mjs";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

const configuration = new Configuration({
    apiKey: env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);


const processArticle = async ({ metadata, body }: any) => {

    try {
        const url = metadata['og:url'] || metadata.url
        const doc = new JSDOM(`${body}`, { url })
        const museDom = doc.window.document


        let reader = new Readability(museDom);
        let articleParse = reader.parse();
        const parsedContent = articleParse?.content.toString()

        const parsedMetada: any = {};
        Object.keys(metadata).forEach((key) => {
            const newKey = key.replace(/:/g, "_");
            parsedMetada[newKey] = metadata[key];
        });

        // EXTRACT IMAGES, PUSH TO ARRAY
        const listImages = parsedContent?.match(/<img[^>]*>/g);

        let readTime = 0
        if (articleParse) {
            readTime = Math.ceil(((articleParse?.length * 0.2) / 60) / 5)
        }

        // const imageLinkList = listImages
        //     ? listImages.map((img:any) => /<img.*?src=['"](.*?)['"]/.exec(img)[1])
        //     : []

        // const $ = cheerio.load(articleParse?.content)
        // const linkObjects = $('a')
        // const links = [];

        // if (linkObjects.length) {
        //     linkObjects.each((index, element) => {
        //         links.push({
        //             text: $(element).text(), // get the text
        //             href: $(element).attr('href'), // get the href attribute
        //         })
        //     })
        // }

        const article = {
            url: url,
            title: articleParse?.title,
            length: articleParse?.length,
            listImages: listImages && [],
            // imageLinkList,
            readTime,
            source: metadata.source,
            origin: "web-app",
            metadata: parsedMetada,
            content: parsedContent,
            author: metadata.author,
            // links
        }

        return article

    } catch (e) {
        console.log("processArticle", e)
        return null
    }
}

const getUrlContentFunction = async ({ url }: { url: string }) => {
    try {
        let responseData: any = await axios.request({
            method: "GET",
            url
        })

        responseData = {
            statusCode: responseData.status,
            body: responseData.data
        }

        return responseData
    } catch (e) {
        console.log("getUrlCOntentFucntion", e)
    }
}

export const articleRouter = createTRPCRouter({
    summarizeArticle: publicProcedure.input(z.object({ content: z.string() })).mutation(async (content) => {
        // console.log(content.input.content);
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Summarize this for someone who is working in corporate world:\n\n` + content.input.content,
            temperature: 0.7,
            max_tokens: 512,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        // console.log(response);
        return response.data.choices[0]

        return { text: "data" }
    }),
    parseArticle: publicProcedure
        .input(z.object({ url: z.string() })).mutation(async ({ input }) => {
            const urlBody = await getUrlContentFunction({ url: input.url })
            const opts = Object.assign(
                {
                    userAgent: 'MetadataScraper',
                    maxRedirects: 10,
                    timeout: 10000,
                    ensureSecureImageRequest: true,
                    sourceMap: {},
                    decode: undefined,
                    encode: undefined
                }
            )
            const metadata = metadataParser(input.url, urlBody.body, opts)
            const _article = await processArticle({ metadata, body: urlBody.body })
            return { content: `url you input: ${input.url} ${urlBody.toString()}`, article: _article }
        })
})