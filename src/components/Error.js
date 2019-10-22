import React, { Component } from 'react'

export default class Error extends Component {
  render () {
    return(
      <h2 className="error-message">{this.props.errorMessage}</h2>
    )
  }
}
