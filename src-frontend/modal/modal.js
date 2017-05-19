import React from 'react';
import PropTypes from 'prop-types';
import './modal.scss'

const cB = 'modal-dialog';
export const Modal = ({
  children,
  title,
  isOpen,
  ...props
}) => (
	<div className={`${cB} ${cB}${isOpen ? '--open' : '--closed'}`} >
    <div className={`${cB}__content-wrapper`}>
      <h2 className={`${cB}__title`}>{title}</h2>
      {children}
    </div>
	</div>
)

export default Modal;
