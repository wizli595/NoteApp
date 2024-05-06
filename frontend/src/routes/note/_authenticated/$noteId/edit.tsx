import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/note/_authenticated/$noteId/edit')({
  component: () => <div>Hello /note/_authenticated/$noteId/edit!</div>
})