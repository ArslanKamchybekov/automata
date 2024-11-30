'use server'

import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs/server'
import { OpenAI } from 'openai'

export const onOpenAIConnect = async (
    api_key: string,
    id: string
    ) => {
    if (api_key) {
        const openai_connected = await db.openAI.findFirst({
        where: {
            apiKey: api_key,
        },
        include: {
            connections: {
            select: {
                type: true,
            },
            },
        },
        })
    
        if (!openai_connected) {
        //create connection
        await db.openAI.create({
            data: {
            userId: id,
            apiKey: api_key,
            connections: {
                create: {
                userId: id,
                type: 'OpenAI',
                },
            },
            },
        })
        }
    }
}

export const getOpenAIConnection = async () => {
    const user = await currentUser()
    if (user) {
        const connection = await db.openAI.findFirst({
        where: {
            userId: user.id,
        },
        })
        if (connection) {
        return connection
        }
    }
    return null
}

export const getOpenAICompletion = async (
    prompt: string
    ) => {
    const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY})
    const completion = await openai.completions.create({
        model: 'gpt-3.5-turbo-instruct',
        prompt: prompt,
        max_tokens: 100,
        n: 1,
    })
    return completion.choices[0].text
}