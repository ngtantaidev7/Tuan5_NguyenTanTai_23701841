import { useEffect, useMemo, useState } from 'react';

const UserSearchFilter = () => {
  const [posts, setPosts] = useState([]);
  const [kSearch, setkSearch] = useState('');

  useEffect(() => {
    const userList = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error('Lỗi fetch posts:', error);
      }
    };
    userList();
  }, []);

  const filteredPost = useMemo(() => {
    return posts.filter((post) =>
      post.title.toLowerCase().includes(kSearch.toLowerCase()),
    );
  }, [posts, kSearch]);

  return (
    <div className='min-h-screen bg-gray-50 py-10 px-4 font-sans'>
      <div className='max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-lg border border-gray-100'>
        <div className='text-center mb-8'>
          <h2 className='text-3xl font-extrabold text-gray-800 tracking-tight uppercase'>
            Post Explorer
          </h2>
          <p className='text-gray-500 mt-2 text-sm'>
            Hiển thị {posts.length} bài viết từ hệ thống
          </p>
        </div>

        <div className='relative mb-6'>
          <input
            className='w-full h-14 pl-6 pr-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none
                       focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all'
            type='text'
            value={kSearch}
            placeholder='Search by title...'
            onChange={(e) => setkSearch(e.target.value)}
          />
        </div>

        <div className='mb-4 flex justify-between items-center px-2'>
          <span className='text-xs font-bold text-gray-400 uppercase tracking-widest'>
            Kết quả: {filteredPost.length}
          </span>
          {kSearch && (
            <button
              onClick={() => setkSearch('')}
              className='text-xs text-blue-500 font-bold'
            >
              XÓA TÌM KIẾM
            </button>
          )}
        </div>

        <div className='space-y-4 max-h-[550px] overflow-y-auto pr-2 custom-scrollbar'>
          {filteredPost.length > 0 ? (
            filteredPost.map((post) => (
              <div
                key={post.id}
                className='p-5 bg-white border border-gray-100 rounded-2xl shadow-sm'
              >
                <h3 className='text-lg font-bold text-gray-800 capitalize leading-tight mb-2'>
                  {post.title}
                </h3>
                <p className='text-gray-600 text-sm leading-relaxed line-clamp-2'>
                  {post.body}
                </p>
              </div>
            ))
          ) : (
            <div className='text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200'>
              <p className='text-gray-400 font-medium'>
                Không tìm thấy bài viết cho "{kSearch}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSearchFilter;
