import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { AgGridReact } from '@ag-grid-community/react';
import { searchMovies } from '../api/movies';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-alpine.css';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useState({ title: '', year: '', page: 1 });
  const [movies, setMovies] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const columnDefs = [
    { headerName: 'Title', field: 'title', sortable: true, filter: true },
    { headerName: 'Year', field: 'year', sortable: true },
    { headerName: 'IMDb', field: 'imdbRating', sortable: true },
    { headerName: 'Rotten Tomatoes', field: 'rottenTomatoesRating', sortable: true },
    { headerName: 'Metacritic', field: 'metacriticRating', sortable: true },
    { headerName: 'Rating', field: 'classification', sortable: true }
  ];

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await searchMovies(searchParams);
      setMovies(data.data);
      setPagination(data.pagination);
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1 className="mb-4">Movie Search</h1>
      <Form onSubmit={handleSearch} className="mb-4">
        <Row>
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Search movies..."
              value={searchParams.title}
              onChange={(e) => setSearchParams({ ...searchParams, title: e.target.value })}
            />
          </Col>
          <Col md={4}>
            <Form.Select
              value={searchParams.year}
              onChange={(e) => setSearchParams({ ...searchParams, year: e.target.value || '' })}
            >
              <option value="">Any Year</option>
              {Array.from({ length: 34 }, (_, i) => 1990 + i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </Form.Select>
          </Col>
          <Col md={2}>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? <Spinner size="sm" /> : 'Search'}
            </Button>
          </Col>
        </Row>
      </Form>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
        <AgGridReact
          rowData={movies}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
        />
      </div>

      {pagination && (
        <div className="d-flex justify-content-between mt-3">
          <Button
            variant="outline-primary"
            disabled={!pagination.prevPage || loading}
            onClick={() => setSearchParams({ ...searchParams, page: pagination.prevPage })}
          >
            Previous
          </Button>
          <span>Page {pagination.currentPage} of {pagination.lastPage}</span>
          <Button
            variant="outline-primary"
            disabled={!pagination.nextPage || loading}
            onClick={() => setSearchParams({ ...searchParams, page: pagination.nextPage })}
          >
            Next
          </Button>
        </div>
      )}
    </Container>
  );
};

export default MoviesPage;