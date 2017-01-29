import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSubscriptions } from '../../actions/SubscriptionActions'

class Dashboard extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (!this.props.products) this.props.fetchSubscriptions
  }

  static fetchData = ({ store }) => {
    store.dispatch(fetchSubscriptions())
  }

  render() {
    return (
      <div className="">
        Dashboard
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSubscriptions: () => dispatch(fetchSubscriptions())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
