import React from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'

import Backdrop from './Backdrop'
import './Modal.css'

const ModalOverlay = (props) => {
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>

      <form onSubmit={props.onSubmit ? props.onSubmit : (event) => event.preventDefault()}>
        <div className={`modal__content ${props.contentClass}`}>{props.children}</div>

        <footer className={`modal__footer ${props.footerClass}`}>{props.footer}</footer>
      </form>
    </div>
  )

  return ReactDOM.createPortal(content, document.getElementById('modal-hook'))
}

const Modal = (props) => {
  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}

      <CSSTransition in={props.show} mountOnEnter unmountOnExit timeout={200} classNames='modal'>
        {/* {...props} it takes the props we pass to the modal and forwards them to modal overlay; spread operator takes all the key-value pairs of the props object and spreads them as attributes onto ModalOverlay */}

        <ModalOverlay {...props} />
      </CSSTransition>
    </>
  )
}

export default Modal
