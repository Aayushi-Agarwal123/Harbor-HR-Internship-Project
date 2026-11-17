import { useEffect, useState, type FormEvent } from "react";
import { ApiError, api, type BuzzPost } from "../api/client";

const mediaReason = "Photo and video uploads were visible and were not used. Harbor HR does not store media files.";

export function BuzzPage() {
  const [posts, setPosts] = useState<BuzzPost[]>([]);
  const [body, setBody] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);
    try {
      const page = await api.buzzPosts();
      setPosts(page.items);
      setMessage(null);
    } catch (error) {
      setMessage(error instanceof ApiError ? error.message : "The feed could not be loaded.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refresh();
  }, []);

  async function publish(event: FormEvent) {
    event.preventDefault();
    try {
      await api.createBuzzPost(body);
      setBody("");
      await refresh();
    } catch (error) {
      if (error instanceof ApiError) {
        setMessage(error.fields.body || error.message);
      }
    }
  }

  async function remove(id: number) {
    await api.deleteBuzzPost(id);
    await refresh();
  }

  return (
    <section>
      <header className="topbar">
        <h1>Buzz</h1>
      </header>
      <article className="panel">
        <h2>Buzz</h2>
        <p className="time-note">
          Post was visible on OrangeHRM and was not clicked. Text posts here are proposed Harbor HR behavior. Share Photos and Share Video stay inactive because no media upload was observed.
        </p>
        {message ? <p className="form-message" role="alert">{message}</p> : null}
        <form onSubmit={(event) => void publish(event)}>
          <label>
            What's on your mind?
            <input name="post" placeholder="What's on your mind?" value={body} onChange={(event) => setBody(event.target.value)} />
          </label>
          <div className="toolbar">
            <button type="button" disabled title={mediaReason}>Share Photos</button>
            <button type="button" disabled title={mediaReason}>Share Video</button>
            <button type="submit">Post</button>
          </div>
        </form>
        {loading ? <p className="muted">Loading posts.</p> : null}
        {!loading && posts.length === 0 ? <p className="info-note" role="status">No posts yet.</p> : null}
        <div className="day-grid">
          {posts.map((post) => (
            <article key={post.id} className="day-card">
              <strong>{post.author_name}</strong>
              <span>{post.body}</span>
              <button type="button" className="secondary" onClick={() => void remove(post.id)}>Delete</button>
            </article>
          ))}
        </div>
      </article>
    </section>
  );
}
