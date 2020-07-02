import React, { useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const TopNav = () => {
	const [navKey, setNavKey] = useState("home")
	
	return (
		<Navbar bg="dark" expand="lg" variant="dark">
		
			<Navbar.Brand href="/">NaNoWriMo Helper</Navbar.Brand>
			
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
			
				<Nav	
					activeKey={navKey}
					onSelect={ key => setNavKey(key) }
				>
					<Nav.Item>
						<Nav.Link eventKey="home" href="/">Home</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="chapters" href="/chapters">Chapters</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="characters" href="/characters">Characters</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="themes" href="/themes">Themes</Nav.Link>
					</Nav.Item>
				</Nav>
			</Navbar.Collapse>
			
		</Navbar>
	)
}

export default TopNav