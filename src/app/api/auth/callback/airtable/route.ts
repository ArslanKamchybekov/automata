import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const code =  req.nextUrl.searchParams.get('code');

    const encoded = Buffer.from(
        `${process.env.AIRTABLE_CLIENT_ID}:${process.env.AIRTABLE_CLIENT_SECRET}`
      ).toString('base64');

    if (code) {
        const response = await fetch('https://airtable.com/oauth2/v1/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${encoded}`,
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code,
                redirect_uri: process.env.AIRTABLE_REDIRECT_URI!,
                code_verifier: process.env.AIRTABLE_CODE_VERIFIER!,
            }),
        });
    
        const data = await response.json();
        
        if (data) {
            const bases = await fetch('https://api.airtable.com/v0/meta/bases', {
                headers: {
                    Authorization: `Bearer ${data.access_token}`,
                },
            });

            const baseData = await bases.json();
            const baseId = baseData.bases[0].id;
            
            return NextResponse.redirect(
                `https://localhost:3000/connections?airtable_access_token=${data.access_token}&base_id=${baseId}`
            );
        }
    }
    return NextResponse.redirect('https://localhost:3000/connections');
}