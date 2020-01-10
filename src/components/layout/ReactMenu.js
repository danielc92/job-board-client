import React, { Component } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/auth';
import { withRouter } from 'react-router'; 
import { compose } from 'redux'


class ReactMenu extends Component {
    handleLogout = () => {
      this.props.history.push('/login')
      this.props.propsLogoutUser()
    }
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
                to="/view-jobs"
                name='find'
                active={menu.item === 'find'}
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
                to="/news"
                name='news'
                active={menu.item === 'news'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                as={Link}
                to="/profile"
                name='profile'
                active={menu.item === 'profile'}
                onClick={this.handleItemClick}
              />
              {/* <Menu.Item
                as={Link}
                to="/analytics"
                name='analytics'
                active={menu.item === 'analytics'}
                onClick={this.handleItemClick}
              /> */}
              <Menu.Item
                as={Link}
                to="/dashboard"
                name='dashboard'
                active={menu.item === 'dashboard'}
                onClick={this.handleItemClick}
              />
              
              <Menu.Menu position='right'>
                <Menu.Item>
                    <div>
                      { auth.isAuthenticated ? 
                      <Button
                        secondary
                        onClick={this.handleLogout}
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

const mapDispatchToProps = {
  propsLogoutUser: logoutUser
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ReactMenu);