import React from 'react';
import SearchBar from '../molecules/SearchBar';
import SearchResults from '../molecules/SearchResults';
import getSuggestions from '../mockDataApi';

const EMPTY_ARRAY = [];

const createOption = suggestion => ({label: `${suggestion} `, value: suggestion});

class SearchBox extends React.Component {

  state = {};

  handleInputChange = ({wholeWordsBeforeCursor, wholeWordsAfterCursor, currentWord}) => {
    this.setState({ 
        wholeWordsBeforeCursor,
        wholeWordsAfterCursor,
        currentWord,
    }, this.fetchOptions);
  };

  handleHoverIndexUpdate = (index, updateCurrentWord) => this.setState({hoveredOptionIndex: index});

  handleHoverIndexUpdateByKeys = index => this.setState({
      hoveredOptionIndex: index,
      currentWord: this.state.options[index].label,
  });

  clearOptions = () => this.setState({
    options: undefined,
    hoveredOptionIndex: undefined,

  });

  fetchOptions = () => {
      const currentWord = this.state.currentWord.trim();

      if(!currentWord){
          return this.clearOptions();
      }

    getSuggestions(this.state.currentWord.trim())
        .then((results = EMPTY_ARRAY) => {
            const options = results.map(createOption);
            this.setState({
                options,
                hoveredOptionIndex: options.length ? 0 : undefined,
             });
        })
        .catch(error => {
            this.setState({
                options: [{error: true}],
                hoveredOptionIndex: undefined,
             });
        })
    }

    handleSuggestionSelect = option => {
        console.log("came in handler");
        this.setState({
            currentWord : option.label,
            options: undefined
        });
    }
  render() {
    const that = this,
        { state } = that,
        {   wholeWordsBeforeCursor,
            wholeWordsAfterCursor,
            options,
            hoveredOptionIndex,
        } = state;

    return (
      <div className="searchbox">
        <SearchBar
          onInputChange={that.handleInputChange}
          wholeWordsBeforeCursor={wholeWordsBeforeCursor}
          wholeWordsAfterCursor={wholeWordsAfterCursor}
          currentWord={state.currentWord}
          onUpdateHoverIndex={that.handleHoverIndexUpdateByKeys}
          onPressEnter={that.clearOptions}
          hoveredOptionIndex={state.hoveredOptionIndex}
          totalOptions={Array.isArray(options) ? options.length : 0}
          onBlur={this.clearOptions}
        />
        <SearchResults
          keywordOptions={options}
          formerLiterals={wholeWordsBeforeCursor}
          laterLiterals={wholeWordsAfterCursor}
          onSelect={that.handleSuggestionSelect}
          onOptionHover={that.handleHoverIndexUpdate}
          hoveredOptionIndex={state.hoveredOptionIndex}
        />
      </div>
    );
  }
};

export default SearchBox;