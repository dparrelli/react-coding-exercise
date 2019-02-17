import React from 'react'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import theme from '../style/theme'

const LoadingTile = ({ classes, className }) => (
  <div className={classNames(classes.tile, className)}>
    <div className={classes.content}>
      <div className={classNames(classes.backgroundImage, classes.animated)} />
      <div className={classes.details}>
        <div className={classNames(classes.title, classes.animated)} />
        <div className={classNames(classes.description, classes.animated)} />
      </div>
    </div>
  </div>
)

export default injectSheet({
  '@keyframes placeholderAnimation': {
    '0%': {
      opacity: '0.5'
    },
    '50%': {
      opacity: '1'
    },
    '100%': {
      opacity: '0.5'
    }
  },
  animated: {
    animationDuration: '1.25s',
    animationFillMode: 'forwards',
    animationIterationCount: 'infinite',
    animationName: 'placeholderAnimation',
    animationTimingFunction: 'ease-in',
    background: 'linear-gradient(to right, #F6F6F6 8%, #F0F0F0 18%, #F6F6F6 33%)',
    backgroundSize: '800px 104px',
    position: 'relative'
  },
  backgroundImage: {
    backgroundColor: '#cdcdcd',
    width: '100%',
    height: '206px'
  },
  tile: {
    overflow: 'hidden',
    position: 'relative'
  },
  content: {
    display: 'block'
  },
  details: {
    padding: [13, 15, 0, 20],
    position: 'relative',
    color: theme.colors.lightText,
    textTransform: 'uppercase',
    fontSize: 11,
    lineHeight: 1.3,
    height: 110,
    backgroundColor: theme.colors.white
  },
  title: {
    margin: [0, 0, 8],
    position: 'relative',
    width: '38%',
    overflow: 'hidden',
    height: '24px',
    backgroundColor: '#cdcdcd'
  },
  description: {
    position: 'relative',
    width: '60%',
    overflow: 'hidden',
    height: '28px',
    backgroundColor: '#eaeaea'
  }
})(LoadingTile)
