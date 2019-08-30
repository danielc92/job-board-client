import React, { Component } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/auth';


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
          stackable
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
                as={Link}
                to="/create-jobs"
                name='create'
                active={activeItem === 'create'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                as={Link}
                to="/view-jobs"
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
                as={Link}
                to="/analytics"
                name='analytics'
                active={activeItem === 'analytics'}
                onClick={this.handleItemClick}
              />
              <Menu.Menu position='right'>
                <Menu.Item>
                    <div>
                      { this.props.auth.isAuthenticated ? 
                      <Button
                        color={this.props.theme}
                        onClick={this.props.propsLogoutUser}
                      >
                        Logout
                      </Button>
                        :
                      <Button 
                        color={this.props.theme}
                        as={Link}
                        to="/login"
                      >
                      Login
                      </Button>
                        }
                      
                      
                    </div>
                </Menu.Item>
                { !this.props.auth.isAuthenticated ? 
                <Menu.Item>
                  <Button 
                  as={Link} 
                  to="/register" 
                  secondary>Register</Button>
                </Menu.Item> : null }
            </Menu.Menu>
          </Container>
        </Menu>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    auth : state.auth,
    theme: state.theme
  }
}

const mapActionsToProps = {
  propsLogoutUser: logoutUser
}

export default connect(mapStateToProps, mapActionsToProps)(ReactMenu);
