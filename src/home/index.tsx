import React, { useState, useEffect } from 'react'
import PapersChart from './PapersChart'
import PaperInfo from './PaperInfo'
import { PaperRefsResponse } from '../Constants'
import TextField from '@material-ui/core/TextField'

const Home = () => {

  const [papers, setPapers] = useState({})
  const [currentPaperId, setCurrentPaperId] = useState()
  const [currentPaperRefs, setCurrentPaperRefs] = useState()

  const fetchPapers = async () => {
    const queryGetPapers = await fetch("/papers",
      {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      })

    const PromiseGetPapers = queryGetPapers.json()

    PromiseGetPapers.then((response: any) => {
      console.log('response:', response)
      setPapers(response)
    })
  }

  const getPaperReferences = async (id: number) => {
    const PromisePaperRefs = fetch(`/papers/${id}/references`,
      {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      }).then((response: any) => response.json())

    PromisePaperRefs.then((paperRefs: any) => {
      setCurrentPaperRefs(paperRefs)
    })
  }

  const handleCurrentPaper = (id: number) => {
    console.log('# handle paper: ', id)
    setCurrentPaperId(id)
    getPaperReferences(id)
  }

  // When component starts, fetch papers data once
  useEffect(() => {
    fetchPapers()
  }, [])

  return (
    <>
      <div className="ma4">
        <div className="flex w-100">
          <form noValidate autoComplete="off" className="w-50">
            <TextField
              id="outlined-read-only-input"
              variant="outlined"
              placeholder="Search..."
              fullWidth
            />
          </form>
        </div>
        <div className="flex-row flex">
          <div className='dib w-70'>
            <PapersChart data={papers} handlePaperId={handleCurrentPaper} currentPaperRefs={currentPaperRefs} />
          </div>
          <div className='dib w-30'>
            <PaperInfo id={currentPaperId} references={currentPaperRefs} />
          </div>
        </div>
      </div>
    </>)
}

export default Home