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
		<h2 className={`${cB}__title`}>{title}</h2>
    <div className={`${cB}__content-wrapper`}>
      {children}
    </div>
	</div>
)

export default Modal;

Modal.propTypes = {
	isOpen: PropTypes.bool.isRequired
}
