import React, { useCallback, useState } from 'react'
import { Option } from './content-based-on-title'
import { ConnectionProviderProps } from '@/providers/connections-provider'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { postContentToWebHook } from '@/app/(main)/(pages)/connections/_actions/discord-connection'
import { onCreateNodeTemplate } from '../../../_actions/workflow-connections'
import { toast } from 'sonner'
import { onCreateNewPageInDatabase } from '@/app/(main)/(pages)/connections/_actions/notion-connection'
import { postMessageToSlack } from '@/app/(main)/(pages)/connections/_actions/slack-connection'
import { getOpenAICompletion } from '@/app/(main)/(pages)/connections/_actions/openai-connection'
import ReactMarkdown from 'react-markdown'

type Props = {
  currentService: string
  nodeConnection: ConnectionProviderProps
  channels?: Option[]
  setChannels?: (value: Option[]) => void
}

const ActionButton = ({
  currentService,
  nodeConnection,
  channels,
  setChannels,
}: Props) => {
  const pathname = usePathname()
  const [openAIOutput, setOpenAIOutput] = useState<string | null>(null)

  const onSendDiscordMessage = useCallback(async () => {
    const response = await postContentToWebHook(
      nodeConnection.discordNode.content,
      nodeConnection.discordNode.webhookURL
    )

    if (response.message == 'success') {
      nodeConnection.setDiscordNode((prev: any) => ({
        ...prev,
        content: '',
      }))
    }
  }, [nodeConnection.discordNode])

  const onStoreNotionContent = useCallback(async () => {
    const response = await onCreateNewPageInDatabase(
      nodeConnection.notionNode.databaseId,
      nodeConnection.notionNode.accessToken,
      nodeConnection.notionNode.content
    )
    if (response) {
      nodeConnection.setNotionNode((prev: any) => ({
        ...prev,
        content: '',
      }))
    }
  }, [nodeConnection.notionNode])

  const onStoreSlackContent = useCallback(async () => {
    const response = await postMessageToSlack(
      nodeConnection.slackNode.slackAccessToken,
      channels!,
      nodeConnection.slackNode.content
    )
    if (response.message == 'Success') {
      toast.success('Message sent successfully')
      nodeConnection.setSlackNode((prev: any) => ({
        ...prev,
        content: '',
      }))
      setChannels!([])
    } else {
      toast.error(response.message)
    }
  }, [nodeConnection.slackNode, channels])

  const onCreateLocalNodeTempate = useCallback(async () => {
    if (currentService === 'Discord') {
      const response = await onCreateNodeTemplate(
        nodeConnection.discordNode.content,
        currentService,
        pathname.split('/').pop()!
      )

      if (response) {
        toast.message(response)
      }
    }
    if (currentService === 'Slack') {
      const response = await onCreateNodeTemplate(
        nodeConnection.slackNode.content,
        currentService,
        pathname.split('/').pop()!,
        channels,
        nodeConnection.slackNode.slackAccessToken
      )

      if (response) {
        toast.message(response)
      }
    }

    if (currentService === 'Notion') {
      const response = await onCreateNodeTemplate(
        JSON.stringify(nodeConnection.notionNode.content),
        currentService,
        pathname.split('/').pop()!,
        [],
        nodeConnection.notionNode.accessToken,
        nodeConnection.notionNode.databaseId
      )

      if (response) {
        toast.message(response)
      }
    }

    if (currentService === 'OpenAI') {
      const response = await onCreateNodeTemplate(
        nodeConnection.openAINode.content,
        currentService,
        pathname.split('/').pop()!
      )

      if (response) {
        toast.message(response)
      }
    }

    if (currentService === 'Airtable') {
      const response = await onCreateNodeTemplate(
        nodeConnection.airtableNode.content,
        currentService,
        pathname.split('/').pop()!
      )

      if (response) {
        toast.message(response)
      }
    }
  }, [nodeConnection, channels])

  const onSendOpenAIRequest = useCallback(async () => {
    const response = await getOpenAICompletion(
      nodeConnection.openAINode.content
    )
    if (response) {
      toast.message('Prompt sent to OpenAI')
      setOpenAIOutput(response)
    }
  }
  , [nodeConnection.openAINode])

  const renderActionButton = () => {
    switch (currentService) {
      case 'Discord':
        return (
          <>
            <Button
              variant="outline"
              onClick={onSendDiscordMessage}
            >
              Test Message
            </Button>
            <Button
              onClick={onCreateLocalNodeTempate}
              variant="outline"
            >
              Save Template
            </Button>
          </>
        )

      case 'Notion':
        return (
          <>
            <Button
              variant="outline"
              onClick={onStoreNotionContent}
            >
              Test
            </Button>
            <Button
              onClick={onCreateLocalNodeTempate}
              variant="outline"
            >
              Save Template
            </Button>
          </>
        )

      case 'Slack':
        return (
          <>
            <Button
              variant="outline"
              onClick={onStoreSlackContent}
            >
              Send Message
            </Button>
            <Button
              onClick={onCreateLocalNodeTempate}
              variant="outline"
            >
              Save Template
            </Button>
          </>
        )

      case 'OpenAI':
        return (
          <>
            <Button
              variant="outline"
              onClick={onSendOpenAIRequest}
            >
              Send Prompt
            </Button>
            <Button
              onClick={onCreateLocalNodeTempate}
              variant="outline"
            >
              Save Template
            </Button>
            {openAIOutput && (
              <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '0.5rem' }}>
                <ReactMarkdown>{openAIOutput}</ReactMarkdown>
              </div>
            )}
          </>
        )  
      
      case 'Airtable':
        return (
          <Button
            onClick={onCreateLocalNodeTempate}
            variant="outline"
          >
            Save Template
          </Button>
        )  

      default:
        return null
    }
  }
  return renderActionButton()
}

export default ActionButton