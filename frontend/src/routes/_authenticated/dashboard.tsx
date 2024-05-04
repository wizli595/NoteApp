import { createFileRoute } from '@tanstack/react-router'
import DashboardPage from '../../pages/private/DashboardPage'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: DashboardPage,
})