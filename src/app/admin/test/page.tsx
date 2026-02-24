export default async function AdminTestPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin Test Page</h1>
      <p>If you can see this, the /admin route is working.</p>
      <p>Time: {new Date().toISOString()}</p>
    </div>
  )
}
