import React from 'react';

import { ReactComponent as EyeOpen } from '../../assets/images/image/eye-open.svg';
import { ReactComponent as EyeClosed } from '../../assets/images/image/EyeClosed.svg';

import styles from './visible-pass.module.scss';

interface Props{
    visiblePass: boolean,
    value: string,
    getVisibilityPassword: () => void,
}

export const VisiblePass:React.FC<Props> = ({visiblePass, value, getVisibilityPassword}) => (
    <React.Fragment>
        {visiblePass && value && (
            <EyeOpen
                className={ styles.icon_eye}
                onClick={getVisibilityPassword}
                data-test-id='eye-opened'
            />
        )}
        {!visiblePass && value && (
            <EyeClosed
                className={styles.icon_eye}
                onClick={getVisibilityPassword}
                data-test-id='eye-closed'
            />
        )}
    </React.Fragment>
  )

