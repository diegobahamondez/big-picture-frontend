import { useState } from 'react';

function SaveBook() {
  const [isbn, setIsbn] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleInputChange = (e) => {
    setIsbn(e.target.value);
  };

  const saveBook = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/books/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isbn }),
      });
      const data = await response.json();
      if (response.ok) {
        setResponseMessage('Book saved successfully');
      } else {
        setResponseMessage(`Error: ${data.message || 'Failed to save book'}`);
      }
    } catch (error) {
      setResponseMessage(`Error: ${error.message}`);
    }
  };

  return (
    <section id="savebook" className="lg:pt-4">
      <h1 className="text-center pb-10 sm:pb-20 text-3xl sm:text-5xl font-bold tracking-tight mt-0">
        <a href="/">Save a Book</a>
      </h1>
      <div className="grid grid-cols-1 gap-6">
        <input
          type="text"
          value={isbn}
          onChange={handleInputChange}
          className="input input-bordered mb-4 w-full"
          placeholder="Enter ISBN"
        />
        <button
          onClick={saveBook}
          className="btn btn-primary"
        >
          Save Book
        </button>
        {responseMessage && (
          <div className="alert alert-info mt-4">
            {responseMessage}
          </div>
        )}
      </div>
    </section>
  );
}

export default SaveBook;
