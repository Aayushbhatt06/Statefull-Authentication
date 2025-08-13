export default function Home({ user }) {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Hello "{user.name}"</h1>
    </div>
  );
}
