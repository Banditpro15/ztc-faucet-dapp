export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { address, xLink } = req.body;

  // Validasi address
  if (!address || !address.startsWith('0x') || address.length !== 42) {
    return res.status(400).json({ success: false, message: 'Invalid address' });
  }

  // Dummy response, gantikan dengan integrasi smart contract kalau perlu
  return res.status(200).json({ success: true });
}
