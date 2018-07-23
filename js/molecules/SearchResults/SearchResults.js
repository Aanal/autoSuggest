import React from 'react';
import PropTypes from 'prop-types';
import SearchImage from '../../atoms/searchImage';

import _isEmpty from 'lodash/isEmpty';
import _partial from 'lodash/partial';

const ERROR_TEXT = "Sorry, not able to fetch suggestions..";

class SearchResults extends React.Component {

  getOptionClickHandler = option => {
    console.log("came here");
    this.props.onSelect(option);
  }

  handleMoverHover = index => () => this.props.onOptionHover(index);

  renderOption = (option, index) => {
    const onClickFn = (option);
    if(option.error){
      return <div className='option option--error'>{ERROR_TEXT}</div>
    }
    return (
        <div 
          key={option.value}
          className={`option text-grey ${this.props.hoveredOptionIndex === index ? 'is-hovered' : ''}`}
          onClick={_partial(this.getOptionClickHandler, option)}
          onMouseEnter={this.handleMoverHover(index)}
        >
         <SearchImage/>
         <span className="option-text">
            <label>
              {this.props.formerLiterals}
              <strong className="text-black">{option.label}</strong>
              {this.props.laterLiterals}
            </label>
         </span>
        </div>
    )
  }

  render() {
    const { props: { keywordOptions } } = this;

    if (_isEmpty(keywordOptions)) {
      return null;
    }

    return (
      <div className="options-container">
        {keywordOptions.map(this.renderOption)}
      </div>
    );
  }
}

SearchResults.propTypes = {
  keywordOptions: PropTypes.array,
  formerLiterals: PropTypes.string,
  laterLiterals: PropTypes.string,
  onSelect: PropTypes.func,
  hoveredOptionIndex: PropTypes.number,
}

export default SearchResults;