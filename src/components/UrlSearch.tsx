import React, {Component} from 'react';
import WebPage from '../interfaces/WebPage.interface';

interface SearchState {
    error: boolean;
    viewMode: boolean;
    performance?: Performance;
}

interface Performance{
    url: string;
    speed_Index: string;
    score: string;
}

export class UrlSearch extends Component <WebPage, SearchState> {
    performanceRef: React.RefObject<HTMLInputElement>;
    constructor(props: WebPage){
        super(props);
        this.state = {
            error: false,
            viewMode: true,
            performance: null
        }
        this.performanceRef = React.createRef();
    }
    setUpQuery = (webUrl: string) => {
        const api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
          /*const parameters = {
            url: encodeURIComponent(webUrl)
          };*/
          const encodedUri = encodeURIComponent(webUrl);
          /*let query = `${api}?`;
          for (let key in parameters) {
            query += `${key}=${parameters[key]}`;
          }*/
          return `${api}?url=${encodedUri}`       //query;
    }
    onSearchClick = () => {
        this.setState({
            error: false,
            viewMode: false,
            performance: null
        });
        const inputValue = this.performanceRef.current.value;
        const query = this.setUpQuery(inputValue);
        fetch(query)
        .then(res => res.json())
        .then(data => {
            this.setState({
                error: false,
                viewMode: true,
                performance: {
                    url: data.id,
                    speed_Index: data.lighthouseResult.audits['speed-index'].displayValue,
                    score: data.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.category
                }
            });
        })
        .catch(error => {
            this.setState({ error: true, viewMode: true });
        });
    }
    render(){
        const {url: webUrl} = this.props;
        const {error, viewMode, performance} = this.state;

        let resultMarkup = error ? <p>Url not found, please try again</p> : (this.state.performance ? <div>
            <p>speed : {performance.speed_Index}</p>
            <p>score : {performance.score}</p>
        </div> : <div></div>) ;

      //  if(this.state.viewMode){
            return (
                <div>
                    <p> Web Page to test : {this.performanceRef.current ? this.performanceRef.current.value : ""} </p>
                    <input type="text" ref={this.performanceRef}/>
                    <button onClick={this.onSearchClick} className="my-button">
                        Test
                    </button>
                    {resultMarkup}
                </div>

            )
    /*    } else {
            return (
                <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            )
        }*/
    }

}

export default UrlSearch