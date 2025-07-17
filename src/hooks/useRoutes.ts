import { RouteType } from "@/types/route.types"

export const useRoutes = () => {
  const routes: RouteType[] = [
    {
      label: 'Home',
      path: '/',
    },
    {
      label: 'Features',
      path: '/#features'
    },
    {
      label: 'Pricing',
      path: '/pricing'
    },
    {
      label: 'About me',
      path: '/#about',
    },
    
  ]

  return routes
}
