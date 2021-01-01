import React,{Component} from 'react';

export default class ErrorHandler extends Component {
    constructor(props) {
      super(props)
      this.state = { errorOccurred: false }
    }
  
    componentDidCatch(error, info) {
      this.setState({ errorOccurred: true })
      window.history.back();
    }
  
    render() {
      return this.state.errorOccurred ? null : this.props.children
    }
  }