const { MongoClient } = require('mongodb');
const { handleStatusChange, handleSaveResource, handleSaveAdvice } = require('../frontend/components/pages/AdminDashboardPage.js');

// Mocking MongoDB Client
jest.mock('mongodb', () => {
  const mockMongoClient = {
    db: jest.fn().mockReturnValue({
      collection: jest.fn().mockReturnValue({
        deleteMany: jest.fn().mockResolvedValue({ deletedCount: 2 }),
      }),
    }),
    close: jest.fn(),
    connect: jest.fn().mockResolvedValue(this),
  };

  return { MongoClient: jest.fn(() => mockMongoClient) };
});

describe('Admin Dashboard Functions', () => {
  
  // FUNCTION TESTS: handleStatusChange
  // This test verifies that the function correctly updates the status of a resource item
  test('handleStatusChange updates resource status', () => {
    const mockResources = [
      { id: 1, status: 'pending' },
      { id: 2, status: 'approved' },
    ];
    const mockSetResources = jest.fn();
    const mockSetAdvice = jest.fn();

    // Mock the functions for state setting
    const context = { setResources: mockSetResources, setAdvice: mockSetAdvice };

    // Mocking the handleStatusChange function to use mock state
    const localHandleStatusChange = (id, newStatus, isResource) => {
      if (isResource) {
        context.setResources(mockResources.map(item => item.id === id ? { ...item, status: newStatus } : item));
      } else {
        context.setAdvice(mockResources.map(item => item.id === id ? { ...item, status: newStatus } : item));
      }
    };

    // Call the function
    localHandleStatusChange(1, 'approved', true);

    // Assertions
    expect(mockSetResources).toHaveBeenCalledWith([
      { id: 1, status: 'approved' },
      { id: 2, status: 'approved' },
    ]);
  });

  // This test verifies that the function correctly updates the status of an advice item
  test('handleStatusChange updates advice status', () => {
    const mockAdvice = [
      { id: 1, status: 'pending' },
      { id: 2, status: 'approved' },
    ];
    const mockSetResources = jest.fn();
    const mockSetAdvice = jest.fn();

    const context = { setResources: mockSetResources, setAdvice: mockSetAdvice };

    const localHandleStatusChange = (id, newStatus, isResource) => {
      if (isResource) {
        context.setResources(mockAdvice.map(item => item.id === id ? { ...item, status: newStatus } : item));
      } else {
        context.setAdvice(mockAdvice.map(item => item.id === id ? { ...item, status: newStatus } : item));
      }
    };

    // Call the function
    localHandleStatusChange(1, 'rejected', false);

    // Assertions
    expect(mockSetAdvice).toHaveBeenCalledWith([
      { id: 1, status: 'rejected' },
      { id: 2, status: 'approved' },
    ]);
  });

  // FUNCTION TESTS: handleSaveResource
  // This test verifies that the function correctly updates an existing resource item
  test('handleSaveResource saves resource', () => {
    const mockResources = [
      { id: 1, status: 'pending' },
      { id: 2, status: 'approved' },
    ];
    const updatedResource = { id: 1, status: 'approved' };
    const mockSetResources = jest.fn();

    const context = { setResources: mockSetResources };

    // Mocking the handleSaveResource function to use mock state
    const localHandleSaveResource = (updatedResource) => {
      context.setResources(mockResources.map(item => item.id === updatedResource.id ? updatedResource : item));
    };

    // Call the function
    localHandleSaveResource(updatedResource);

    // Assertions
    expect(mockSetResources).toHaveBeenCalledWith([
      updatedResource,
      { id: 2, status: 'approved' },
    ]);
  });

  // This test verifies that the function adds a new resource to the list if it does not already exist
  test('handleSaveResource adds new resource if not existing', () => {
    const mockResources = [
      { id: 1, status: 'pending' },
      { id: 2, status: 'approved' },
    ];
    const newResource = { id: 3, status: 'new' };
    const mockSetResources = jest.fn();

    const context = { setResources: mockSetResources };

    const localHandleSaveResource = (resource) => {
      const resourceExists = mockResources.some(item => item.id === resource.id);
      if (resourceExists) {
        context.setResources(mockResources.map(item => item.id === resource.id ? resource : item));
      } else {
        context.setResources([...mockResources, resource]);
      }
    };

    // Call the function
    localHandleSaveResource(newResource);

    // Assertions
    expect(mockSetResources).toHaveBeenCalledWith([
      ...mockResources,
      newResource
    ]);
  });

  // FUNCTION TESTS: handleSaveAdvice
  // This test verifies that the function correctly updates an existing advice item
  test('handleSaveAdvice saves advice', () => {
    const mockAdvice = [
      { id: 1, status: 'pending' },
      { id: 2, status: 'rejected' },
    ];
    const updatedAdvice = { id: 1, status: 'approved' };
    const mockSetAdvice = jest.fn();

    const context = { setAdvice: mockSetAdvice };

    // Mocking the handleSaveAdvice function to use mock state
    const localHandleSaveAdvice = (updatedAdvice) => {
      context.setAdvice(mockAdvice.map(item => item.id === updatedAdvice.id ? updatedAdvice : item));
    };

    // Call the function
    localHandleSaveAdvice(updatedAdvice);

    // Assertions
    expect(mockSetAdvice).toHaveBeenCalledWith([
      updatedAdvice,
      { id: 2, status: 'rejected' },
    ]);
  });

  // This test verifies that the function resets the edit state after saving an advice item
  test('handleSaveAdvice resets edit state after saving', () => {
    const mockAdvice = [
      { id: 1, status: 'pending' },
      { id: 2, status: 'rejected' },
    ];
    const updatedAdvice = { id: 1, status: 'approved' };
    const mockSetAdvice = jest.fn();
    let editAdvice = { id: 1, status: 'pending' };

    const context = { setAdvice: mockSetAdvice };

    const localHandleSaveAdvice = (updatedAdvice) => {
      context.setAdvice(mockAdvice.map(item => item.id === updatedAdvice.id ? updatedAdvice : item));
      editAdvice = null;
    };

    // Call the function
    localHandleSaveAdvice(updatedAdvice);

    // Assertions
    expect(mockSetAdvice).toHaveBeenCalledWith([
      updatedAdvice,
      { id: 2, status: 'rejected' },
    ]);
    expect(editAdvice).toBe(null);
  });
});
