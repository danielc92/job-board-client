import React, { Component } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class ReactMenu extends Component {
    
    state = {
        activeItem: 'home'
    }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name})
    }
    
    render() {

        const { activeItem } = this.state;

        return (
            
          <Menu 
          pointing 
          style={{ margin: '0'}}>
            <Container>
              <Menu.Item
                as={Link}
                to="/"
                name='home'
                active={activeItem === 'home'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='create'
                active={activeItem === 'create'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='find'
                active={activeItem === 'find'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                as={Link}
                to="/news"
                name='news'
                active={activeItem === 'news'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='analytics'
                active={activeItem === 'analytics'}
                onClick={this.handleItemClick}
              />
              <Menu.Menu position='right'>
                <Menu.Item>
                    <div>
                      <Button 
                      primary
                      >Login</Button>
                      <Button 
                      secondary>Register</Button>
                    </div>
                </Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    auth : state.auth
  }

}

export default connect(mapStateToProps)(ReactMenu);
