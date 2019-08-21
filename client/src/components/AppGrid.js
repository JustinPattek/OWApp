import React, { Component } from 'react';
//import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
//import { render } from 'react-dom';
import { ListManager } from "react-beautiful-dnd-grid";
import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';
import PropTypes from 'prop-types';

const rowMax = 3;
const ext_regex = /\.(gif|jpe?g|png)$/;
const folders_regex = /^\.\/[A-Za-z0-9-]*\//;
const images = importAll(require.context('./images/', true, /\.(gif|jpe?g|png)$/));
// Import all images in image folder
function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace(folders_regex, '').replace(ext_regex , '')] = r(item); });
    return images;
}

class AppGrid extends Component {

    state = {
        //sortedList: sortList(list)
        sortedList: sortList(this.props.list.list)
    }

  sortList = () => {   
    this.setState({
      ...this.state,
      sortedList: sortList(this.state.sortedList)
    })
  }

componentDidMount(){
    this.props.getItems();
}

  reorderList = (sourceIndex, destinationIndex) => {
    if (destinationIndex === sourceIndex) {
      return;
    }
    const list = this.state.sortedList;
    if (destinationIndex === 0) {
      list[sourceIndex].order = list[0].order - 1;
      this.sortList();
      return;
    }
    if (destinationIndex === list.length - 1) {
      list[sourceIndex].order = list[list.length - 1].order + 1;
      this.sortList();
      return;
    }
    if (destinationIndex < sourceIndex) { 
        list[sourceIndex].order = (list[destinationIndex].order + list[destinationIndex - 1].order) / 2;
        this.sortList();
        return;
    }
    list[sourceIndex].order = (list[destinationIndex].order + list[destinationIndex + 1].order) / 2;
    this.sortList();
  }

  render() {
    return (    
            <div className="AppGrid">
                <ListManager
                items={ this.state.sortedList }
                direction="horizontal"
                maxItems={ rowMax }
                render={ item => <ListElement item={ item } /> }
                onDragEnd={ this.reorderList }
                /> 
            </div>
    );
  } 
}

AppGrid.propTypes = {
    getItems: PropTypes.func.isRequired,
    list: PropTypes.object.isRequired
}

function sortList(list) {  
    console.log(list);
  //return list.slice().sort((first, second) => first.order - second.order);
  return list;
}

function ListElement({ item: { name } }) {
  return <div className="item"><img src={images[`${name}-small`]} alt={name} /></div>;
}

const mapStateToProps = (state) => ({
    list: state.list
});

export default connect(mapStateToProps, { getItems })(AppGrid);