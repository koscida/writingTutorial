import React from 'react'
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const TopNav = () => {
	
	return (
		<Navbar bg="dark" expand="lg" variant="dark">
		
			<Navbar.Brand as={NavLink} to="/">NaNoWriMo Helper</Navbar.Brand>
			
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav>
					<Nav.Item>
						<NavLink to="/chapters" activeClassName="active" className="nav-link">Chapters</NavLink>
					</Nav.Item>
					<Nav.Item>
						<NavLink to="/characters" activeClassName="active" className="nav-link">Characters</NavLink>
					</Nav.Item>
					<Nav.Item>
						<NavLink to="/themes" activeClassName="active" className="nav-link">Themes</NavLink>
					</Nav.Item>
				</Nav>
			</Navbar.Collapse>
			
		</Navbar>
	)
}

export default TopNav