import { createFactory } from 'react'
// import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import BoatInfo from './BoatInfo'

export const views = {
  boatInfo: createFactory(BoatInfo),
}

export default function compile(viewId, context) {
  const template = views[viewId]
  return renderToStaticMarkup(template(context))
}
