// template.js
module.exports = {
  componentTemplate: compoenntName => {
    return `import React, { Component } from 'react'

class ${compoenntName} extends Component {
  render () {
    return (
      <div className={'-c-${compoenntName}'}>
        ${compoenntName}
      </div>
    )
  }
}

export default ${compoenntName}
`
  },
  pageTemplate: (pageName, pageAddress) => {
    let fullName = pageAddress && pageAddress.length > 1 ? pageAddress.join('-') : pageName
    return `import React, { Component } from 'react'
import { connect } from 'react-redux'

class ${pageName} extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentDidMount () {

  }
  render () {
    return (
      <div className={'-p-${fullName}'}>
        ${pageName}
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {}
  }
)(${pageName})
`
  }
}
