import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DetailPage from '../pages/DetailPage/DetailPage';
import * as fetchService from '../services/fetchData'; // Fixed import path

// Mock data
const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  phone: '123-456-7890',
  website: 'johndoe.com',
  address: {
    street: 'Main St',
    suite: 'Apt. 1',
    city: 'Cityville',
    zipcode: '12345',
  },
  company: {
    name: 'Company Inc.',
    catchPhrase: 'Innovate Everything',
    bs: 'business strategy',
  },
};

const mockPosts = [
  {
    id: 1,
    title: 'Post Title 1',
    body: 'Post body content 1',
    userId: 1
  },
  {
    id: 2,
    title: 'Post Title 2',
    body: 'Post body content 2',
    userId: 1
  },
  {
    id: 3,
    title: 'Post Title 3',
    body: 'Post body content 3',
    userId: 1
  },
];

// Mock the entire fetchService module
jest.mock('../services/fetchData', () => ({
  fetchDataID: jest.fn(),
  fetchUserPosts: jest.fn(),
}));

describe('DetailPage', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    fetchService.fetchDataID.mockResolvedValue(mockUser);
    fetchService.fetchUserPosts.mockResolvedValue(mockPosts);
  });

  const renderDetailPage = (userId = '1') => {
    return render(
      <MemoryRouter initialEntries={[`/user/${userId}`]}>
        <Routes>
          <Route path="/user/:id" element={<DetailPage />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('renders loading state initially', () => {
    renderDetailPage();
    expect(screen.getByText(/loading user details/i)).toBeInTheDocument();
  });

  it('renders user details and recent posts after loading', async () => {
    renderDetailPage();

    // Wait for the name to appear
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Check if contact info appears
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('123-456-7890')).toBeInTheDocument();
    expect(screen.getByText('johndoe.com')).toBeInTheDocument();

    // Check if address appears
    expect(screen.getByText(/Main St/)).toBeInTheDocument();
    expect(screen.getByText(/Cityville/)).toBeInTheDocument();
    expect(screen.getByText(/12345/)).toBeInTheDocument();

    // Check if company info appears
    expect(screen.getByText('Company Inc.')).toBeInTheDocument();
    expect(screen.getByText('Innovate Everything')).toBeInTheDocument();

    // Check if post titles appear
    expect(screen.getByText('Post Title 1')).toBeInTheDocument();
    expect(screen.getByText('Post Title 2')).toBeInTheDocument();
    expect(screen.getByText('Post Title 3')).toBeInTheDocument();
  });

  it('calls fetchDataID and fetchUserPosts with correct parameters', async () => {
    renderDetailPage('5');

    await waitFor(() => {
      expect(fetchService.fetchDataID).toHaveBeenCalledWith('5');
      expect(fetchService.fetchUserPosts).toHaveBeenCalledWith('5');
    });
  });

  it('handles API error gracefully', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    fetchService.fetchDataID.mockRejectedValue(new Error('API Error'));
    
    renderDetailPage();

    await waitFor(() => {
      expect(screen.getByText(/loading user details/i)).toBeInTheDocument();
    });

    // Clean up
    consoleError.mockRestore();
  });

  it('handles empty posts array', async () => {
    fetchService.fetchUserPosts.mockResolvedValue([]);
    
    renderDetailPage();

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Should still render user details even with no posts
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('renders correct number of posts', async () => {
    renderDetailPage();

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Check that all 3 posts are rendered
    const postTitles = screen.getAllByText(/Post Title/);
    expect(postTitles).toHaveLength(3);
  });

  it('displays post bodies correctly', async () => {
    renderDetailPage();

    await waitFor(() => {
      expect(screen.getByText('Post Title 1')).toBeInTheDocument();
    });

    // Check if post bodies are displayed
    expect(screen.getByText('Post body content 1')).toBeInTheDocument();
    expect(screen.getByText('Post body content 2')).toBeInTheDocument();
    expect(screen.getByText('Post body content 3')).toBeInTheDocument();
  });

  it('handles different user IDs correctly', async () => {
    const differentUser = { ...mockUser, id: 2, name: 'Jane Smith' };
    fetchService.fetchDataID.mockResolvedValue(differentUser);
    
    renderDetailPage('2');

    await waitFor(() => {
      expect(fetchService.fetchDataID).toHaveBeenCalledWith('2');
      expect(fetchService.fetchUserPosts).toHaveBeenCalledWith('2');
    });
  });

  it('displays all user address fields', async () => {
    renderDetailPage();

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Check all address components
    expect(screen.getByText(/Main St/)).toBeInTheDocument();
    expect(screen.getByText(/Apt\. 1/)).toBeInTheDocument();
    expect(screen.getByText(/Cityville/)).toBeInTheDocument();
    expect(screen.getByText(/12345/)).toBeInTheDocument();
  });
});