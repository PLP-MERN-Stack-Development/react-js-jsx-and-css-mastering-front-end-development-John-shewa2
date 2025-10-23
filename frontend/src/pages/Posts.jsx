import React, { useState, useEffect, useRef, useCallback } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';

const API = 'https://jsonplaceholder.typicode.com/posts';
const PAGE_SIZE = 3;

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState(''); // debounced search
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [infinite, setInfinite] = useState(true);

  // debounce search input
  useEffect(() => {
    const t = setTimeout(() => {
      setQuery(search.trim());
      setPage(1);
    }, 350);
    return () => clearTimeout(t);
  }, [search]);

  // fetch data
  useEffect(() => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();

    // JSONPlaceholder supports _page and _limit; use q for basic search
    const url = new URL(API);
    url.searchParams.set('_limit', PAGE_SIZE);
    url.searchParams.set('_page', page);
    if (query) url.searchParams.set('q', query);

    fetch(url.toString(), { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setPosts((prev) => (page === 1 ? data : [...prev, ...data]));
        setHasMore(data.length === PAGE_SIZE);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Failed to fetch');
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [page, query]);

  // infinite scroll: observe sentinel
  const sentinelRef = useRef(null);
  const observer = useRef(null);
  const lastSentinelCallback = useCallback((node) => {
    if (!infinite) return;
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        setPage((p) => p + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [infinite, hasMore, loading]);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => p + 1);
  const handleToggleInfinite = () => setInfinite((v) => !v);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Posts</h1>

        <div className="flex items-center gap-2">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts..."
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button variant="secondary" onClick={() => { setSearch(''); setQuery(''); setPage(1); }}>
            Clear
          </Button>
          <Button variant="secondary" onClick={handleToggleInfinite}>
            {infinite ? 'Disable' : 'Enable'} infinite
          </Button>
        </div>
      </div>

      {error && <div className="text-red-600">Error: {error}</div>}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.id} title={post.title}>
            <p className="text-sm text-gray-700 dark:text-gray-300">{post.body}</p>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-center gap-3">
        {!infinite && (
          <>
            <Button variant="secondary" onClick={handlePrev} disabled={page === 1}>
              Prev
            </Button>
            <span>Page {page}</span>
            <Button variant="primary" onClick={handleNext} disabled={!hasMore}>
              Next
            </Button>
          </>
        )}
      </div>

      {loading && <div className="text-center text-gray-500">Loading...</div>}

      {/* sentinel element for infinite scroll */}
      <div ref={lastSentinelCallback} />

      {/* fallback message when no posts */}
      {!loading && posts.length === 0 && <div className="text-center text-gray-500">No posts found.</div>}
    </div>
  );
}