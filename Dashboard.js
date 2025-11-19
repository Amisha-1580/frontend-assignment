import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProfile, listTasks, createTask, updateTask, deleteTask } from '../api';

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(()=>{
    const load = async () => {
      try {
        const [p, t] = await Promise.all([fetchProfile(), listTasks()]);
        setProfile(p.data);
        setTasks(t.data.data || t.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title) return;
    try {
      const res = await createTask({ title });
      setTasks(prev => [res.data, ...prev]);
      setTitle('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id && t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Dashboard</h4>
        <div>
          <strong>{profile?.name}</strong> &nbsp;
          <button className="btn btn-outline-secondary btn-sm" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="card p-3 mb-3">
        <form onSubmit={handleCreate} className="d-flex gap-2">
          <input className="form-control" placeholder="New task title" value={title} onChange={e=>setTitle(e.target.value)} />
          <button className="btn btn-primary">Add</button>
        </form>
      </div>

      <div className="list-group">
        {tasks.length === 0 && <div className="text-muted">No tasks yet.</div>}
        {tasks.map(t => (
          <div key={t.id || t._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>{t.title || t.name}</div>
            <div>
              <button className="btn btn-sm btn-danger" onClick={()=>handleDelete(t.id || t._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
