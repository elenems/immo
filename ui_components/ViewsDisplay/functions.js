export default function convertViews(views) {
  if (views === 0) return 'No views';
  if (views === 1) return '1 view';
  if (views > 0 && views < 100000) return `${views} views`;
  if (views >= 100000 && views < 1000000) return `${String(views).slice(3)}k views`;
  if (views >= 1000000) return `${String(views).slice(0, 1)},${String(views).slice(1, 2)}m views`;
  return `${views} views`;
}
