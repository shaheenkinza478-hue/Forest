export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function getRandomReply(replies) {
  return replies[Math.floor(Math.random() * replies.length)];
}