import { useEffect, useState } from 'react';

const TodoCRUD = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [input, setInput] = useState('');
  const API_URL = 'https://jsonplaceholder.typicode.com/todos';
  useEffect(() => {
    const fetchTodoLists = async () => {
      try {
        setLoading(true);
        const res = await fetch(API_URL);
        const data = await res.json();
        setTodos(data);
      } catch (error) {
        console.log('Dữ liệu không thể lấy được !', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTodoLists();
  }, []);

  // Ham them task
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newTodo = { title: input, completed: false };
    setSubmitting(true);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo),
      });
      if (!res.ok) throw new Error('Lỗi khi thêm mới');
      const saveTodo = await res.json();
      setTodos([saveTodo, ...todos]);
      setInput('');
    } catch (error) {
      alert('Lỗi kết nối: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Ham xoa task
  const handleDelete = async (id) => {
    const originalTodos = [...todos];

    setTodos(todos.filter((t) => t.id !== id));

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Xóa thất bại rồi nhé !');
    } catch (error) {
      alert('Lỗi kết nối: ' + error.message);
      setTodos(originalTodos);
    }
  };
  return (
    <>
      <div className='max-w-md mx-auto w-full h-full p-5 mt-5 bg-white border border-gray-100 rounded-2xl shadow-xl'>
        <h2 className='font-bold text-center mb-5 text-3xl text-gray-600'>
          Danh sách TODO LIST
        </h2>

        {/* Ô input + nút thêm */}
        <form onSubmit={handleAdd} className='flex gap-2 mb-6 '>
          <input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={submitting}
            placeholder='Thêm việc cần làm vào nhé bro !...'
            className='flex-1 h-12 px-4 bg-gray-50 text-sm border border-gray-200 rounded-xl outline-none'
          />
          <button
            type='submit'
            disabled={submitting || !input.trim()}
            className='px-6 bg-cyan-200 text-white font-bold rounded-2xl'
          >
            {submitting ? '...' : 'Add Todo'}
          </button>
        </form>
        {/* Danh sách todoList */}
        <div className='space-y-3'>
          {loading ? (
            <p className='text-center text-gray-400'>Đang tải dữ liệu...</p>
          ) : (
            todos.map((todo) => (
              <div
                key={todos.id}
                className='flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-gray-100'
              >
                <span className='text-gray-700 font-medium'>{todo.title}</span>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className='text-red-500 font-bold text-sm'
                >
                  DELETE
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default TodoCRUD;
