import React, { Component } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/auth';


class ReactMenu extends Component {
    
    render() {
        const { menu, auth, theme } = this.props;
        return (
            
          <Menu 
          color={ theme }
          pointing 
          stackable
          style={{ margin: '0', borderRadius: 'none', boxShadow: 'none'}}>
            <Container>
              <Menu.Item
                as={Link}
                to="/"
                name='home'
                active={menu.item === 'home'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                as={Link}
                to="/create-jobs"
                name='create'
                active={menu.item === 'create'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                as={Link}
                to="/view-jobs"
                name='find'
                active={menu.item === 'find'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                as={Link}
                to="/news"
                name='news'
                active={menu.item === 'news'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                as={Link}
                to="/analytics"
                name='analytics'
                active={menu.item === 'analytics'}
                onClick={this.handleItemClick}
              />
              <Menu.Menu position='right'>
                <Menu.Item>
                    <div>
                      { auth.isAuthenticated ? 
                      <Button
                        secondary
                        onClick={this.props.propsLogoutUser}
                      >
                        Logout
                      </Button>
                        :
                      <Button.Group>

                        <Button 
                        color={theme}
                        as={Link}
                        to="/login">Login
                        </Button>

                        <Button.Or/>

                        <Button 
                        as={Link} 
                        to="/register" 
                        color="green">Register
                        </Button>

                      </Button.Group>
                        }
                    </div>
                </Menu.Item>
                { !this.props.auth.isAuthenticated ? 
                <Menu.Item>
                  
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
    theme: state.theme,
    menu: state.menu
  }
}

const mapActionsToProps = {
  propsLogoutUser: logoutUser
}

export default connect(mapStateToProps, mapActionsToProps)(ReactMenu);
