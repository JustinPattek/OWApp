import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { render } from 'react-dom';
import { ListManager } from "react-beautiful-dnd-grid";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

const ext_regex = /\.(gif|jpe?g|png)$/;
const folders_regex = /^\.\/[A-Za-z0-9-]*\//;
const images = importAll(require.context('./images/', true, /\.(gif|jpe?g|png)$/));
const list = [
    {
      id: "0",
      order: 0
    },
    {
      id: "1",
      order: 1
    },
    {
      id: "2",
      order: 2
    },
    {
      id: "3",
      order: 3
    },
    {
      id: "4",
      order: 4
    }
  ];

// Import all images in image folder
function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace(folders_regex, '').replace(ext_regex , '')] = r(item); });
    return images;
}

class HeroList extends Component {   
    // componentDidMount(){
    //     this.props.getItems();
    // };

    constructor(props) {
        super(props);
        this.state = {
          sortedList: sortList(props.list)
        }
    }


    // onDeleteClick = (id) => {
    //     this.props.deleteItem(id);
    // };

    sortList = () => {
        this.setState({
          ...this.state,
          sortedList: sortList(this.state.sortedList)
        })
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
        const { list } = { list };
    return(
        <div className="HeroList">
          <ListManager
            items={this.state.sortedList}
            direction="horizontal"
            maxItems={3}
            render={item => <ListElement item={item} />}
            onDragEnd={this.reorderList}
          />
        </div >
      )};
    
    // render() {
    //     const { items } = this.props.item;
    //     return (
    //         <Container>       
    //             <ListGroup>
    //                 <TransitionGroup className="hero-list">
    //                     {items.map(({ id, hero }) => (
    //                         <CSSTransition key={id} timeout={500} classNames="fade">
    //                         <ListGroupItem>                                                  
    //                         <Button
    //                             className="remove-btn"
    //                             color="danger"
    //                             size="sm"
    //                             onClick={this.onDeleteClick.bind(this, id)}
    //                             >
    //                             &times;
    //                             </Button>
    //                             <img src={images[`${hero}-small`]} alt={hero} />
    //                             </ListGroupItem>
    //                         </CSSTransition>
    //                     ))}
    //                 </TransitionGroup>
    //             </ListGroup>
    //         </Container>
    //     );
    // }
}

HeroList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    item: state.item
});

function sortList(list) {
    return list.slice().sort((first, second) => first.order - second.order);
} 
function ListElement({ item: { id } }) {
    return <div className="item"><div>{id}</div></div>;
}
//render(<HeroList list={list} />, document.getElementById('root'));

export default connect(
    mapStateToProps, 
    { getItems, deleteItem }
)(HeroList);