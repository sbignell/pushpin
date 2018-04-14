import React from 'react'
import { connect } from 'react-redux'
import Rnd from 'react-rnd'
import classNames from 'classnames'
import InlineEditor from './inline-editor'
import { CARD_DRAG_STOPPED, CARD_RESIZE_STOPPED } from './action-types'

const textInnerPresentation = (card) => {
  return (
  <InlineEditor
    cardId={card.get('id')}
    editorState={card.get('editorState')}
    createFocus={card.get('selected')}
  />
  )
}

const imageInnerPresentation = (card) => {
  return (
  <img
    className='image'
    src={card.get('path')}
  />
  )
}

const resizeAvailable = {
  bottomRight: true,
  top: false,
  right: false,
  bottom: false,
  left: false,
  topRight: false,
  bottomLeft: false,
  topLeft: false
}

const presentation = ({ card, onDragStop, onResizeStop }) => {
  return (
  <Rnd
    className={ classNames('card', card.get('selected') ? 'selected' : 'unselected') }
    size={{ width: card.get('width'), height: card.get('height') }}
    minWidth={100}
    minHeight={100}
    enableResizing={resizeAvailable}
    lockAspectRatio={card.get('type') === 'text' ? false : true }
    position={{ x: card.get('x'), y: card.get('y') }}
    onDragStop={(e, d) => { onDragStop(card.get('id'), d.x, d.y) }}
    onResizeStop={(e, direction, ref, delta, position) => { onResizeStop(card.get('id'), ref.offsetWidth, ref.offsetHeight) }}
  >
    { card.get('type') === 'text' ? textInnerPresentation(card) : imageInnerPresentation(card) }
  </Rnd>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDragStop: (id, x, y) => {
      dispatch({type: CARD_DRAG_STOPPED, id: id, x: x, y: y})
    },
    onResizeStop: (id, width, height) => {
      dispatch({type: CARD_RESIZE_STOPPED, id: id, width: width, height: height})
    }
  }
}

const Card = connect(null, mapDispatchToProps)(presentation)

export default Card