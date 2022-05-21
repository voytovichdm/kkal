module.exports.timeConverter = (unix) => {
  const a = new Date(unix);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const year = a.getFullYear();
  const month = a.getMonth(); // months[a.getMonth()];
  const datee = a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes();
  const sec = a.getSeconds();
  const time = `${datee}-${month}-${year}-${hour}:${min}:${sec}`;
  return time;
};
