import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [address, setAddress] = useState('');
  const [xLink, setXLink] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async () => {
    if (!address.startsWith('0x') || address.length !== 42) {
      return setStatus('⚠️ Invalid Ethereum address');
    }

    setStatus('⏳ Sending request...');
    try {
      const res = await fetch('/api/requestFaucet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, xLink }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus('✅ ZTC Tokens sent successfully!');
      } else {
        setStatus(`❌ Error: ${data.message}`);
      }
    } catch (err) {
      setStatus('❌ Failed to request faucet.');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Zenchain Testnet Faucet</h1>
      <input
        type="text"
        placeholder="Zenchain Testnet Address (0x...)"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className={styles.input}
      />
      <input
        type="text"
        placeholder="Link to X Post (Optional)"
        value={xLink}
        onChange={(e) => setXLink(e.target.value)}
        className={styles.input}
      />
      <button onClick={handleSubmit} className={styles.button}>
        Receive ZTC
      </button>
      <p>{status}</p>
    </div>
  );
}
