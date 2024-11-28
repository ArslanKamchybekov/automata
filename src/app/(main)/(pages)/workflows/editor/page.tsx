'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

type Props = object

const Page = (props: Props) => {
    const router = useRouter();

    useEffect(() => {
        // Redirect to '/workflows' and trigger the WorkflowButton click event
        router.push('/workflows');
    
        const workflowButton = document.getElementById('workflow-button') as HTMLElement;
        workflowButton?.click();
    }, [router]);
    
    return <div>Redirecting...</div>;
    
}

export default Page