'use client'
import React from 'react'
import Image from 'next/image'
import {
  Calendar,
  CircuitBoard,
  Database,
  GitBranch,
  HardDrive,
  Mail,
  MousePointerClickIcon,
  Plus,
  Slack,
  Timer,
  Webhook,
  Zap,
} from 'lucide-react'
import { EditorCanvasTypes } from '@/lib/types'

type Props = { type: EditorCanvasTypes }

const EditorCanvasIconHelper = ({ type }: Props) => {
  switch (type) {
    case 'Email':
      return (
        <Mail
          className="flex-shrink-0"
          size={30}
        />
      )
    case 'Condition':
      return (
        <GitBranch
          className="flex-shrink-0"
          size={30}
        />
      )
    case 'OpenAI':
      return (
        <Image  
          src="/openai.png"
          alt="OpenAI"
          width={30}
          height={30}
          className="flex-shrink-0"
        />
      )
    case 'Slack':
      return (
        <Slack
          className="flex-shrink-0"
          size={30}
        />
      )
    case 'Google Drive':
      return (
        <HardDrive
          className="flex-shrink-0"
          size={30}
        />
      )
    case 'Notion':
      return (
        <Image
          src="/notion.png"
          alt="Notion"
          width={30}
          height={30}
          className="flex-shrink-0"
        />
      )
    case 'Airtable':
      return (
        <Image
          src="/airtable.png"
          alt="Airtable"
          width={30}
          height={30}
          className="flex-shrink-0"
        />
      )  
    case 'Custom Webhook':
      return (
        <Webhook
          className="flex-shrink-0"
          size={30}
        />
      )
    case 'Google Calendar':
      return (
        <Calendar
          className="flex-shrink-0"
          size={30}
        />
      )
    case 'Trigger':
      return (
        <MousePointerClickIcon
          className="flex-shrink-0"
          size={30}
        />
      )
    case 'Action':
      return (
        <Zap
          className="flex-shrink-0"
          size={30}
        />
      )
    case 'Wait':
      return (
        <Timer
          className="flex-shrink-0"
          size={30}
        />
      )
    case 'Discord':
      return (
        <Image
          src="/discord.png"
          alt="Discord"
          width={30}
          height={30}
          className="flex-shrink-0"
        />
      )
    default:
      return (
        <Zap
          className="flex-shrink-0"
          size={30}
        />
      )
  }
}

export default EditorCanvasIconHelper