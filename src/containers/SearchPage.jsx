import { bindActionCreators } from 'redux'

import doSearch from '../actions/Search'
import Search from '../components/Search'

class SearchPage extends React.Component {
  render() {
    return (<Search/>)
  }
}

const actions = [
  doSearch,
]

const mapStateToProps = state => {
  return {
    device: {
      platform: state.device.platform,
    },
    global: {
      currentUser: state.global.currentUser,
    },
  }
}

const mapDispatchToProps = dispatch => {
  const creators = Map()
    .merge(...actions)
    .filter(value => typeof value === 'function')
    .toObject()

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
