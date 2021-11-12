import { useLocation } from 'react-router-dom'

export const useLocationQuery = (key: string): string | undefined => {
  return new URLSearchParams(useLocation().search).get(key) ?? undefined
}


type UseLocationQueriesProps = Array<{
  key: string
  defaultValue?: string
}>

export const useLocationQueries = (props: UseLocationQueriesProps): Array<string> => {
  return props.map(({ key, defaultValue }) => {
    return new URLSearchParams(useLocation().search).get(key) ?? defaultValue ?? ''
  })
}
