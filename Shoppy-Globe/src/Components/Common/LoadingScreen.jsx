export default function LoadingScreen({ label = 'Loading…' }) {
  return <div className="loading-state" role="status"><span className="loader-orbit" /><p>{label}</p></div>;
}