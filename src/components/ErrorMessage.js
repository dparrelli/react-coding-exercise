import React from 'react'
import injectSheet from 'react-jss'
import { compose } from 'redux'
import Icon from './Icon'
import titleIcon from '../icons/vivid-angle-top-left.svg'

const ErrorMessage = ({ classes, title, message }) => (
  <div className={classes.container}>
    <h3 className={classes.title}>
      <Icon className={classes.titleIcon} symbol={titleIcon} />
      {title || 'Uh oh! Looks like there was an issue loading this content'}
    </h3>
    {message && (
      <p>{message}</p>
    ) }
  </div>
)

export default compose(
  injectSheet({
    title: {
      paddingLeft: 20,
      position: 'relative'
    },
    titleIcon: {
      position: 'absolute',
      left: 0,
      top: 5
    }
  })
)(ErrorMessage)
