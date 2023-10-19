export default function formatTailNumber(id) {
  if (typeof id !== 'number') return null

  const tn = id.toString().padStart(6, '0')
  return tn.slice(0, 2) + '-' + tn.slice(2)
}
