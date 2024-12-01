'use server'

import { Option } from '@/components/ui/multiple-selector'
import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs/server'
import axios from 'axios'

export const onAirtableConnect = async (
    airtableAccessToken: string,
    baseId: string,
    userId: string
): Promise<void> => {
    if (!airtableAccessToken || !baseId) {
        console.error('Missing Airtable access token or base ID');
        return;
    }

    const airtableConnection = await db.airtable.findFirst({
        where: {
            airtableAccessToken: airtableAccessToken,
            baseId: baseId,
        },
        include: { connections: true },
    });

    if (!airtableConnection) {
        await db.airtable.create({
            data: {
                userId: userId,
                airtableAccessToken: airtableAccessToken,
                baseId: baseId,
                connections: {
                    create: { userId: userId, type: 'Airtable' },
                },
            },
        });
    }
};


export const getAirtableConnection = async () => {
    const user = await currentUser()
    if (user) {
        return await db.airtable.findFirst({
            where: { userId: user.id },
        })
    }
    return null
}

export async function listTables(
    apiKey: string,
    baseId: string
    ): Promise<Option[]> {
    const url = `https://api.airtable.com/v0/meta/bases/${baseId}/tables`
    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${apiKey}`,
        },
    })
    return response.data.records.map((record: any) => ({
        value: record.id,
        label: record.fields.Name,
    }))
}

export async function listFields(
    apiKey: string,
    baseId: string,
    tableName: string
    ): Promise<Option[]> {
    const url = `https://api.airtable.com/v0/${baseId}/${tableName}?${new URLSearchParams({
        view: 'Grid view',
    })}`
    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${apiKey}`,
        },
    })
    return Object.keys(response.data.records[0].fields).map((field: any) => ({
        value: field,
        label: field,
    }))
}

export async function getRecord(
    apiKey: string,
    baseId: string,
    tableName: string,
    recordId: string
    ): Promise<any> {
    const url = `https://api.airtable.com/v0/${baseId}/${tableName}/${recordId}`
    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${apiKey}`,
        },
    })
    return response.data
}

export async function createRecord(
    apiKey: string,
    baseId: string,
    tableName: string,
    fields: any
    ): Promise<any> {
    const url = `https://api.airtable.com/v0/${baseId}/${tableName}`
    const response = await axios.post(url, { fields }, {
        headers: {
            Authorization: `Bearer ${apiKey}`,
        },
    })
    return response.data
}