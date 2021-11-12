import { Program } from '@project-serum/anchor'
import useAnchorProvider from '@/hooks/useAnchorProvider'
import { useMemo } from 'react'

const useExchangeProgram = (): Program | undefined => {
  const anchorProvider = useAnchorProvider()

  return useMemo(() => {
    if (!anchorProvider) {
      return undefined
    }

    return new Program(require('./idls/Exchange.json'), '5nibWrtmkx1oUfsZpm24XbkJp1jRAe9do8K7MotuqWZo', anchorProvider)
  }, [anchorProvider])
}

export default useExchangeProgram
