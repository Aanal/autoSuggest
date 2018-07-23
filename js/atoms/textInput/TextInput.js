
import React from 'react';
import PropTypes from 'prop-types';
import _omit from 'lodash/omit';

const PROPS_TO_NOT_PASS = ['isFocused'];

class TextInput extends React.Component {

    componentDidMount(){
        this.toggleFocus(this.props.isFocused);
    }

    componentWillReceiveProps(nextProps){
       this.toggleFocus(nextProps.isFocused)
    }

    setInputRef = _ref => this.input = _ref;

    toggleFocus = isFocused => !!isFocused ? this.input.focus() : this.input.blur();

    render(){
        const that = this;
        return (
            <input type='text' 
                ref={that.setInputRef}
                {..._omit(that.props, PROPS_TO_NOT_PASS)}
            />);
    }

}

TextInput.propTypes = {
    isFocused: PropTypes.bool,
    onFocus: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    value: PropTypes.string.isRequired,
};

export default TextInput;

