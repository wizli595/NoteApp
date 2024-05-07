import { createFileRoute } from '@tanstack/react-router'
import CreateNotePage from '../../../pages/private/note/CreateNotePage'

export const Route = createFileRoute('/note/_authenticated/create')({
  component: CreateNotePage
})