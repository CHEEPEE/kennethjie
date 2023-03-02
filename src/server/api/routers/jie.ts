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
import { resume_data } from "~/utils/resumedata";
const configuration = new Configuration({
    apiKey: env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

export const jieRouter = createTRPCRouter({
    chat: publicProcedure.input(z.object({ content: z.string() })).mutation(async (content) => {
        console.log(content.input.content);
        const initialPromt = `based on this data: \n\n ${JSON.stringify(resume_data)} \n\n AI pretend as Jie and have a conversation with this You:` + content.input.content

        const getPromt = () => {
            const clientPrompt: string = content.input.content
            if (clientPrompt.includes(JSON.stringify(resume_data))) {
                return clientPrompt
            } else {
                return initialPromt
            }
        }
        const getResponse = (response: string | undefined) => {
            if (response?.includes('Jie: ')) {
                return response
            } else {
                return 'Jie:' + response
            }
        }
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: getPromt(),
            temperature: 0.7,
            max_tokens: 2048,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        console.log(response.data.choices[0]);
        return getPromt() + getResponse(response.data.choices[0]?.text) + '\n'
        // return { text: "data" }
    }),
})