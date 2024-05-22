import { useState, useEffect } from 'react';

const Table = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/books/');
      const data = await response.json();
      setTableData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (summary) => {
    document.getElementById('summary_modal').innerText = summary;
    document.getElementById('summary_modal_dialog').showModal();
  };

  return (
    <section id="dynamic-table" className="pb-32 pt-32">
      <h1 className="text-center pb-10 sm:pb-20 text-3xl sm:text-5xl font-bold tracking-tight mt-0">
        <a href="/">List of saved books</a>
      </h1>
      <button className="btn mb-4" onClick={fetchData}>Fetch Data Again</button>
      <div className="overflow-x-auto">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>ISBN</th>
                <th>Title</th>
                <th>Author</th>
                <th>Summary</th>
                <th>Cover</th>
              </tr>
            </thead>
            <tbody>
              {tableData.length === 0 ? (
                <tr>
                  <td colSpan="5">No data</td>
                </tr>
              ) : (
                tableData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.isbn}</td>
                    <td>{item.title}</td>
                    <td>{item.author}</td>
                    <td>
                      {item.summary.length > 50 ? (
                        <>
                          <button className="btn" onClick={() => openModal(item.summary)}>Read Summary</button>
                          <dialog id="summary_modal_dialog" className="modal">
                            <div className="modal-box">
                              <h3 className="font-bold text-lg">Summary</h3>
                              <p id="summary_modal" className="py-4"></p>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                              <button onClick={() => document.getElementById('summary_modal_dialog').close()}>Close</button>
                            </form>
                          </dialog>
                        </>
                      ) : (
                        item.summary
                      )}
                    </td>
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={item.cover_url} alt={`${item.title} cover`} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th>ISBN</th>
                <th>Title</th>
                <th>Author</th>
                <th>Summary</th>
                <th>Cover</th>
              </tr>
            </tfoot>
          </table>
        )}
      </div>
    </section>
  );
};

export default Table;
