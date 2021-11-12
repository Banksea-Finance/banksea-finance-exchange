import { Program } from '@project-serum/anchor'
import useAnchorProvider from '@/hooks/useAnchorProvider'
import { useMemo } from 'react'

const useBankseaProgram = (): Program | undefined => {
  const anchorProvider = useAnchorProvider()

  return useMemo(() => {
    if (!anchorProvider) {
      return undefined
    }

    return new Program(require('./idls/Banksea.json'), 'A5ws9phjEaNwrSjzGkRRxH53QDzmaJuQY1xompPpBwXf', anchorProvider)
  }, [anchorProvider])
}

export default useBankseaProgram
