import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';

import SearchBar from './components/search_bar.js';
import VideoList from './components/video_list.js';
import VideoDetail from './components/video_details.js';

const API_KEY ='AIzaSyA-4xOoBMUeu_BUEPgq6iwkcafgqc3RFSM';



class App extends Component {

	constructor(props) {
		super(props);

		this.state = { videos: [], selectedVideo: null };

		this.videoSearch('');
	}

	videoSearch(term){

		YTSearch({key: API_KEY, term: term },(data)=>{
		this.setState({
			videos: data,
			selectedVideo: data[0]

			});
		});
	}

	render() {

		const videoSearch = _.debounce((term)=>{this.videoSearch(term)},450);

		return (
				<div className="row">
					<div className="col-md-1"/>
					<div className="col-md-8">
						<SearchBar onSearchTermChange={videoSearch}/>
						<VideoDetail video={this.state.selectedVideo}/>
					</div>
					<div className="col-md-3">
						<VideoList
							onVideoSelect={selectedVideo => this.setState({selectedVideo})}
							videos={this.state.videos} />
					</div>
				</div>
			);
	}
}

ReactDOM.render(<App />, document.querySelector('.container-fluid'));