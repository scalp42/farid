import React, { Component } from 'react'
import { Link } from 'react-router'

class Navigation extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }


  render() {
    return (
      <div className="row">
        <nav>
          <div className="nav-wrapper">
            <div className="col s12">
              <a href="#" className="brand-logo">Farid</a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  <Link
                    to={``}
                    onClick={()=>{})}
                  >
                    home
                  </Link>
                  <Link
                    to={``}
                    onClick={()=>{})}
                  >
                    sign up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default Navigation
