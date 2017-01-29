import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sendEmail } from '../../actions/UserActions'

class SignUp extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  handleClick = (event) => {
    // test email regex before posting
    sendEmail({ email: event.target.value })
  }

  render() {
    return (
      <div className="">
        Sign Up
        {/*insert form*/}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.email
  }
}

export default connect(mapStateToProps)(SignUp)
