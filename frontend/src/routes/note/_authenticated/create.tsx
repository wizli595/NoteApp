import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/note/_authenticated/create')({
  component: () => <div>Hello /note/_authenticated/create!</div>
})