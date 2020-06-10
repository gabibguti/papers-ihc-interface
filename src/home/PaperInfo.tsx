import { Typography, Link, Card, CardHeader, CardContent } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import React, { useEffect, useState } from 'react'
import ServiceWorker from '../serviceWorker/index'

interface CustomProps {
  paper?: any,
  loading: boolean
}

const PaperInfo = ({ paper, loading }: CustomProps) => {

  return (
    <Card className="flex flex-column justify-center ma5 pa4">
      <CardHeader
        title="Artigo"
        titleTypographyProps={{
          color: 'textSecondary',
          variant: 'overline',
        }}
      />
      <CardContent>
        {!paper && !loading && (
          <Typography variant="subtitle1" color="textSecondary">
            Nenhum artigo selecionado
          </Typography>
        )}
        {loading && (
          <>
            {/* Title */}
            <div className="flex-auto w-50 pt2 pb4">
              <Skeleton variant="text" animation={loading ? 'wave' : false} height={35} />
            </div>
            <div className="flex flex-row pb5">
              <div className="flex-auto flex-column w-80">
                {/* Abstract */}
                <div className="flex-auto w-20">
                  <Skeleton variant="text" animation={loading ? 'wave' : false} height={30} />
                </div>
                <div className="flex-auto w-80">
                  <Skeleton variant="text" animation={loading ? 'wave' : false} />
                </div>
                <div className="flex-auto w-80">
                  <Skeleton variant="text" animation={loading ? 'wave' : false} />
                </div>
                <div className="flex-auto w-80">
                  <Skeleton variant="text" animation={loading ? 'wave' : false} />
                </div>
                <div className="flex-auto w-70">
                  <Skeleton variant="text" animation={loading ? 'wave' : false} />
                </div>
              </div>
              <div className="flex-auto flex-column w-20">
                {/* Authors */}
                <div className="flex-auto w-60">
                  <Skeleton variant="text" animation={loading ? 'wave' : false} height={30} />
                </div>
                <div className="flex-auto w-90">
                  <Skeleton variant="text" animation={loading ? 'wave' : false} />
                </div>
                <div className="flex-auto w-80">
                  <Skeleton variant="text" animation={loading ? 'wave' : false} />
                </div>
                <div className="flex-auto">
                  <Skeleton variant="text" animation={loading ? 'wave' : false} />
                </div>
              </div>
            </div>
            {/* Cited */}
            <div className="flex-auto w-20">
              <Skeleton variant="text" animation={loading ? 'wave' : false} height={30} />
            </div>
            <div className="flex-auto w-40">
              <Skeleton variant="text" animation={loading ? 'wave' : false} />
            </div>
            <div className="flex-auto w-30">
              <Skeleton variant="text" animation={loading ? 'wave' : false} />
            </div>
            <div className="flex-auto w-40 pb4">
              <Skeleton variant="text" animation={loading ? 'wave' : false} />
            </div>
            {/* Cited By */}
            <div className="flex-auto w-20">
              <Skeleton variant="text" animation={loading ? 'wave' : false} height={30} />
            </div>
            <div className="flex-auto w-30">
              <Skeleton variant="text" animation={loading ? 'wave' : false} />
            </div>
            <div className="flex-auto w-40">
              <Skeleton variant="text" animation={loading ? 'wave' : false} />
            </div>
          </>
        )}
        {paper && !loading && (
          <>
            <div className="flex-auto pt2 pb4">
              <Typography variant="h4" gutterBottom>
                {paper.paper_title}
              </Typography>
            </div>
            <div className="flex flex-row pb3">
              <div className="flex-auto flex-column w-80 pr5">
                <Typography variant="h6" gutterBottom>
                  Resumo
                </Typography>
                {paper.paper_abstract_pt ? (
                  <Typography variant="body1" gutterBottom>
                    {paper.paper_abstract_pt}
                  </Typography>
                ) : (
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                      Nenhum
                    </Typography>
                  )}
              </div>
              <div className="flex-auto flex-column w-20">
                <Typography variant="h6" gutterBottom>
                  Autores
                </Typography>
                {paper.paper_authors?.length ? (
                  <Typography variant="body1" display="block" gutterBottom>
                    {paper.paper_authors.map((author: string) => (
                      <span className="flex pb2">{author}</span>
                    ))}
                  </Typography>
                ) : (
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                      Nenhum
                    </Typography>
                  )}
              </div>
            </div>
            <div className="flex flex-column pb3 w-80">
              <Typography variant="h6" gutterBottom>
                Artigos referenciados
              </Typography>
              {paper.paper_references?.length ? (
                <Typography variant="body1" gutterBottom>
                  {paper.paper_references.map((reference: any, index: any) => (
                    <span key={index} className="flex pb2">
                      {
                        reference.paper_reference_id
                          ? <Link href={`#${reference.paper_reference_id}`} onClick={() => console.log('what now?')}>
                            {reference.paper_reference}
                          </Link>
                          : <span>{reference.paper_reference}</span>
                      }
                    </span>
                  ))}
                </Typography>
              ) : (
                  <Typography variant="body1" color="textSecondary" gutterBottom>
                    Nenhum
                  </Typography>
                )}
            </div>
            {/* <div className="flex flex-column pb3 w-80">
              <Typography variant="h6" gutterBottom>
                Referência em
              </Typography>
              {paper.paper_references.citedBy && paper.paper_references.citedBy.length ? (
                <Typography variant="body1" gutterBottom>
                  {paper.paper_references.citedBy.map(([paper_id, paper_title]: [number, string]) => (
                    <span key={paper_id} className="flex pb2">
                      <Link href={`#${paper_id}`} onClick={() => console.log(paper_id)}>
                        {paper_title}
                      </Link>
                    </span>
                  ))}
                </Typography>
              ) : (
                  <Typography variant="body1" color="textSecondary" gutterBottom>
                    Nenhum
                  </Typography>
                )}
            </div> */}
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default PaperInfo
