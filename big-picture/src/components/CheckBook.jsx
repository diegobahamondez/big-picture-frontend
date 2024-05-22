import { useState } from 'react';

export default function CheckBook() {
  const [isbn, setIsbn] = useState('');
  const [bookInfo, setBookInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setIsbn(e.target.value);
  };

  const fetchBookInfo = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/isbn/${isbn}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setBookInfo(data);
    } catch (error) {
      console.error('Error fetching book info:', error);
      setBookInfo(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section id="about" className="mb-24 scroll-mt-16 md:mb-24 lg:scroll-mt-24">
        <h1 className="text-center lg:pt-4 pb-6 text-3xl sm:text-5xl font-bold tracking-tight">
          <a href="/">Check a book!</a>
        </h1>
        <div className="card text-sm p-4 bg-base-200 hover:bg-base-300 hover:shadow-2xl">
          <p className="mb-4">Enter the ISBN code of the book to fetch its details:</p>
          <input
            type="text"
            value={isbn}
            onChange={handleInputChange}
            className="input input-bordered mb-4 w-full"
            placeholder="Enter ISBN"
          />
          <button
            onClick={fetchBookInfo}
            className={`btn btn-primary mb-4 ${loading ? 'loading' : ''}`}
          >
            {loading ? 'Fetching...' : 'Check Book'}
          </button>
          {bookInfo && (
            <div className="card">
              <pre data-prefix="$"><code>{`ISBN: ${bookInfo.isbn}`}</code></pre>
              <pre data-prefix="$"><code>{`Title: ${bookInfo.title}`}</code></pre>
              <pre data-prefix="$"><code>{`Author: ${bookInfo.author}`}</code></pre>
              <pre data-prefix="$"><code>{`Cover URL: ${bookInfo.cover_url}`}</code></pre>
              Summary:
              <div className=''>{`${bookInfo.summary}`}</div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
