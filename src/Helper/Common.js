export const getIssueData = () => {
    const exploreStr = sessionStorage.getItem('IssueData');
    if (exploreStr) return JSON.parse(exploreStr);
    else return null;
}

export const setIssueData = (exploreData) => {
    sessionStorage.setItem('IssueData', JSON.stringify(exploreData));
  }