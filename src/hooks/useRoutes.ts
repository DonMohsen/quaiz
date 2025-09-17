import { LandingRouteType } from "@/types/route.types"

export const useRoutes = () => {
  const routes: LandingRouteType[] = [
    {
      label: 'Home',
      path: '/',
    },
    {
      label: 'Features',
      path: '/#features'
    },
    {
      label: 'Reasons',
      path: '/#reasons'
    },
    {
      label: 'About me',
      path: '/#about-me',
    },
    
  ]

  return routes
}
