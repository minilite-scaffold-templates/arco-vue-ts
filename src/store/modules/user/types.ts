export type MenuList = {
  id: string
  name: string
  icon: string
  path: string
  children: {
    id: string
    name: string
    path: string
  }[]
}[]
