import { React } from 'react'
import workMenuRoutes from '@/router/workMenuRoutes'
import PropTypes from 'prop-types'
import styles from './workMenu.module.sass'

function WorkMenu({ handleWorkChange = () => {}, isMenuOpen = false }) {
  return (
    <div
      className={styles.root}
      style={{
        transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
      }}
    >
      <h2 className={styles.menuTitle}>{'vivi\'s 作品選單'}</h2>
      <ul className={styles.menu}>
        {workMenuRoutes?.map(group => (
          <div key={group.category} className={styles.category}>
            <div className={styles.categoryTitle}>{group.category}</div>

            <ul className={styles.menu}>
              {group.projects.map(project => (
                <li key={project.workTitle} className={styles.menu}>
                  <button
                    type="button"
                    className={styles.button}
                    onClick={() => handleWorkChange(project)}
                  >
                    {project.workTitle}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default WorkMenu

WorkMenu.propTypes = {
  handleWorkChange: PropTypes.func,
  isMenuOpen: PropTypes.bool,
}
