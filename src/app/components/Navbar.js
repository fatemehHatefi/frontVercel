'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Form, Button, Navbar as BootstrapNavbar, Nav, NavDropdown } from 'react-bootstrap';
import styles from './navbar.module.css'; // Import custom styles

const Navbar = ({ setSearchTerm }) => {
  const [searchQuery, setSearchQueryState] = useState('');
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const router = useRouter();
  const { pathname } = router; // Get current route path

  // List of categories
  const categories = ["Science Fiction & Fantasy", "Action & Adventure", "Drama & Romance", "Animation & Family"];

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    const name = localStorage.getItem('userName');
    setUserEmail(email);
    setUserName(name);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchTerm(searchQuery.trim());
      router.push(`/search?query=${searchQuery.trim()}`);
    }
  };

  const handleHomeClick = () => {
    setSearchQueryState('');
    setSearchTerm('');
    router.push('/'); // Redirect to home
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName'); // Clear userName as well
    setUserEmail(null);
    setUserName(null); // Clear userName state
    router.push('/login'); // Redirect to login page after logout
  };

  const handleCategorySelect = (category) => {
    router.push(`/category?category=${encodeURIComponent(category.toLowerCase())}`);
  };

  const isActive = (path) => pathname === path ? styles.active : '';

  return (
    <BootstrapNavbar className={styles.navbar} expand="lg">
      <BootstrapNavbar.Brand as={Link} href="/" className={styles.navbarBrand}>
        MovieVerse
      </BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BootstrapNavbar.Collapse id="basic-navbar-nav">
        <Nav className={`me-auto ${styles.navItems}`}>
          <Nav.Link 
            as={Link} 
            href="/" 
            onClick={handleHomeClick} 
            className={`${styles.navLink} ${isActive('/')}`}>
            Home
          </Nav.Link>
          {userEmail && (
            <Nav.Link 
              as={Link} 
              href="/watchlist" 
              className={`${styles.navLink} ${isActive('/watchlist')}`}>
              Watchlist
            </Nav.Link>
          )}

          {userEmail && (
            <Nav.Link 
              as={Link} 
              href="/visitedMovies" 
              className={`${styles.navLink} ${isActive('/visitedMovies')}`}>
              visited Movies
            </Nav.Link>
          )}

          {/* Category Dropdown */}
          <NavDropdown 
            title="Categories" 
            id="categories-dropdown" 
            className={styles.navLink}>
            {categories.map((category) => (
              <NavDropdown.Item 
                key={category} 
                onClick={() => handleCategorySelect(category)}>
                {category}
              </NavDropdown.Item>
            ))}
          </NavDropdown>

          <Nav.Link 
            as={Link} 
            href="/about" 
            className={`${styles.navLink} ${isActive('/about')}`}>
            About
          </Nav.Link>
        </Nav>
        <Form className={`d-flex ${styles.searchForm}`} onSubmit={handleSearch}>
          <Form.Control
            type="search"
            placeholder="Search for movies"
            className={`me-2 ${styles.formControl}`}
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQueryState(e.target.value)}
          />
          <Button variant="outline-success" type="submit" className={styles.searchButton}>
            Search
          </Button>
        </Form>
        <Nav className={styles.authLinks}>
          {userEmail ? (
            <>
              <Nav.Link className={styles.navLink}>Welcome, {userName}</Nav.Link>
              <Button variant="outline-danger" onClick={handleLogout} className={styles.logoutButton}>
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Nav.Link as={Link} href="/login" className={`${styles.navLink} ${isActive('/login')}`}>Log In</Nav.Link>
              <Nav.Link as={Link} href="/signup" className={`${styles.navLink} ${isActive('/signup')}`}>Sign Up</Nav.Link>
            </>
          )}
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
};

export default Navbar;
