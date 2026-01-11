import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import styles from './loadingAnim.module.sass'

export default function LoadingAnim({
  isLoading = false, loadingText = '', notLoadingText = '',
}) {
  return (
    <div className={styles.root}>
      {isLoading && (<div className={clsx('spinner')} />)}

      <p className={styles.tipText}>
        {isLoading
          ? loadingText : notLoadingText}
      </p>
    </div>
  )
}

LoadingAnim.propTypes = {
  isLoading: PropTypes.bool,
  loadingText: PropTypes.string,
  notLoadingText: PropTypes.string,
}
