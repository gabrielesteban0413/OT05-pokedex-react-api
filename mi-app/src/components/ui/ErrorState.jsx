import { AlertTriangle } from 'lucide-react';

export default function ErrorState({ message = 'Algo salio mal' }) {
  return (
    <div className="state state--error">
      <AlertTriangle size={28} />
      <p>{message}</p>
    </div>
  );
}
