import React from 'react';
import PropTypes from 'prop-types';

import _isEmpty from 'lodash/isEmpty';
import _noop from 'lodash/noop';

import CloseButton from '../../atoms/closeButton';
import SearchImage from '../../atoms/searchImage';
import TextInput from '../../atoms/TextInput';

import { getQueryParts, getQueryFromParts} from './searchBarHelper';

const INPUT_LABEL = 'Search keywords';
const EMPTY_STRING = '';

class SearchBar extends React.PureComponent {

  state = {}

  searchQuery = ''

  componentWillReceiveProps(nextProps){
    if(nextProps.currentWord != this.props.currentWord){
      this.searchQuery = getQueryFromParts(nextProps);
      this.handleInputFocus();
    }
  }

  componentDidMount() {
    this.handleInputFocus();
  }

  handleClear = () => this.updateQueryParts();

  handleInputChange = event => this.updateQueryParts(event.target.value);

  handleInputBlur = () => this.setState({isInputFocused: false}, this.props.onBlur)

  handleInputFocus = () => this.setState({isInputFocused: true});

  handleKeyDown = event => {
    const { hoveredOptionIndex } = this.props;

    switch (event.keyCode) {
      case 13: {
        this.props.onPressEnter();
        break;
      }
      case 27: {
        this.handleClear();
        break;
      }
      case 38: {
        event.preventDefault();
        if( hoveredOptionIndex > 0){
          this.props.onUpdateHoverIndex(hoveredOptionIndex - 1);
        }
        break;
      }

      case 40: {
        if( hoveredOptionIndex < this.props.totalOptions - 1){
          this.props.onUpdateHoverIndex(hoveredOptionIndex + 1);
        }
        break;
      }
    }
    
  }

  updateQueryParts = newQuery => this.props.onInputChange(getQueryParts(newQuery, this.searchQuery));

  render() {
    const that = this,
      { props } = that,
      {isInputFocused} = that.state;

    return (
      <div className={`search-container ${isInputFocused ? 'search-container--focused': ''}`}>
        <SearchImage className="search-container__image" />
        <TextInput 
          placeholder={INPUT_LABEL}
          value={that.searchQuery}
          onChange={that.handleInputChange}
          onFocus={that.handleInputFocus}
          onBlur={that.handleInputBlur}
          onKeyDown={that.handleKeyDown}
          className="search-input"
          isFocused={isInputFocused}
      />
        {that.searchQuery && <CloseButton onClick={that.handleClear} />}
      </div>
    );
  }
}

SearchBar.propTypes = {
  onInputChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onUpdateHoverIndex: PropTypes.func,
  onPressEnter: PropTypes.func,
  wholeWordsBeforeCursor: PropTypes.string,
  wholeWordsAfterCursor: PropTypes.string,
  currentWord: PropTypes.string,
}

SearchBar.defaultProps = {
  wholeWordsBeforeCursor: EMPTY_STRING,
  wholeWordsAfterCursor: EMPTY_STRING,
  currentWord: EMPTY_STRING,
  onBlur: _noop,
  onFocus: _noop,
}

export default SearchBar;