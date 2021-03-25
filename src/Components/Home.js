import React, {Component} from 'react'
import axios from 'axios'
import dayjs from "dayjs"
import ReactPaginate from 'react-paginate';
import { setIssueData } from '../Helper/Common.js';
import '../App.css'
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);


const issueIcon = (
    <svg
      viewBox="0 0 14 16"
      version="1.1"
      width="14"
      height="16"
      aria-hidden="true"
      fill="#28a745"
    >
      <path
        fillRule="evenod"
        d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"
      />
    </svg>
  );
  
  const Header = () => 
      <header className="App-header">
        <svg
          height="32"
          className="octicon"
          viewBox="0 0 16 16"
          version="1.1"
          width="32"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
          />
        </svg>
        GitHub
      </header>

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            data: [],
            perPage: 10,
            currentPage: 0
        };
        this.handlePageClick = this
            .handlePageClick
            .bind(this);
    }
 
  handleClick = (id) => () => { 
    setIssueData(id)
    window.location = '/content';


};
    receivedData() {
        axios
            .get(`https://api.github.com/repos/walmartlabs/thorax/issues`)
            .then(res => {
                const data = res.data;
                const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                const postData = slice.map(pd => <React.Fragment>                    
                   <div>
      <div className="issue-row">
        <div className="issue-icon">{issueIcon}</div>
        <div className="issue-text">
          <div className="issue-title"><a style={{ cursor:"pointer" }} href={null} onClick={this.handleClick(pd.number)} > {pd.title}</a></div>
          <div className="issue-subtitle">
          {`Status:${pd.state}`}
          <span>  </span>

          <span>  </span>
          {`# ${pd.id} opened ${dayjs().to(dayjs(pd.created_at))} by `}
          <span>  </span>
            <a
              href={`https://api.github.com/users/${pd.user.login}`}
              onClick={this.handleClick(pd.number)}
            >
              {" "}          
              {pd.user.login}
            </a>
          </div>
        </div>
      </div>
    </div>

                </React.Fragment>)
                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage),
                   
                    postData
                })
            })
            .catch(error => {
              console.log(error.response.data.error)
           });
    }
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData()
        });

    };

    componentDidMount() {
        this.receivedData()
    }
    render() {
        return (
            <div className="issues-table">
                            <Header />
                <div >                 
                    {this.state.postData}
                </div>                
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
            </div>
        )
    }
}
