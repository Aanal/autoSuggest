const EMPTY_QUERY_PARTS = {
    wholeWordsBeforeCursor: '',
    wholeWordsAfterCursor: '',
    currentWord: '',
};

const findIndexUpdated = (newString, oldString) => {
    const length = Math.min(newString.length, oldString.length);
    for(let i = 0; i < length; i++){
        if(newString.charAt(i) != oldString.charAt(i)){
          return i;
        }
        
    }
      return newString.length - 1;
  }
    
const divideSentenceIntoPartsByCursorPostion = (index, query) => {
      const preLiterals = query.substring(0, index+1);
      const postLiterals = query.substring(index+1);
      const lastSpaceBeforeCurrentPosition = preLiterals.lastIndexOf(' ');
      const firstSpaceIndexAfterCursorPostion = postLiterals.indexOf(' ');
      const wholeWordsBeforeCursor = preLiterals.substring(0, lastSpaceBeforeCurrentPosition + 1);
      const wholeWordsAfterCursor = postLiterals.substring(firstSpaceIndexAfterCursorPostion + 1);
      const currentWord = preLiterals.substring(lastSpaceBeforeCurrentPosition + 1) + postLiterals.substring(0, firstSpaceIndexAfterCursorPostion + 1);
        
      return {wholeWordsBeforeCursor, wholeWordsAfterCursor, currentWord};
    }

export const getQueryFromParts = ({wholeWordsBeforeCursor, wholeWordsAfterCursor, currentWord}) => `${wholeWordsBeforeCursor}${currentWord}${wholeWordsAfterCursor}`;
    
export const getQueryParts = (newString, oldString) => {
    if(!newString){
        return EMPTY_QUERY_PARTS;
    }
    const updatedIndex = findIndexUpdated(newString, oldString);
        
    return divideSentenceIntoPartsByCursorPostion(updatedIndex, newString);
}

export default {
    getQueryParts,
    getQueryFromParts,
}