import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const TopNav = () => {
	const [navKey, setNavKey] = useState("home")
	
	return (
		<Navbar bg="dark" expand="lg" variant="dark">
		
			<Navbar.Brand as={Link} to="/">NaNoWriMo Helper</Navbar.Brand>
			
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav	
					// activeKey={navKey}
					// onSelect={ key => {console.log(key); setNavKey(key)} }
				>
					<Nav.Item>
						<Nav.Link>
							<NavLink to="/chapters" activeClassName="active">Chapters</NavLink>
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link>
							<NavLink to="/characters" activeClassName="active">Characters</NavLink>
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link>
							<NavLink to="/themes" activeClassName="active">Themes</NavLink>
						</Nav.Link>
					</Nav.Item>
				</Nav>
			</Navbar.Collapse>
			
		</Navbar>
	)
}

export default TopNav